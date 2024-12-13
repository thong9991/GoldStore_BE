import { OrderDetailsDTO } from '../../../../domain/dtos/OrderDetails/OrderDetails'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { StaffDTO } from '../../../../domain/dtos/Staff/Staff'
import { StaffErrorType } from '../../../../domain/enums/staff/ErrorType'
import { StaffSuccessType } from '../../../../domain/enums/staff/SuccessType'
import { IOrderDetailsRepository } from '../../../repositories/OrderDetails'
import { IRelativeRepository } from '../../../repositories/Relative'
import { IStaffRepository } from '../../../repositories/Staff'
import { IUserRepository } from '../../../repositories/User'
import { IDeleteStaffUseCase } from '../DeleteStaff'

/**
 * Use case for deleting staff.
 * @class
 * @implements {IDeleteStaffUseCase}
 */
export class DeleteStaffUseCase implements IDeleteStaffUseCase {
  /**
   * Creating an instance of DeleteStaffUseCase.
   * @constructor
   * @param {IStaffRepository} staffRepository - The repository for the staffs data.
   * @param {IUserRepository} userRepository - The repository for user data.
   * @param {IRelativeRepository} relativeRepository - The repository for the relatives data.
   * @param {IOrderDetailsRepository} orderDetailsRepository - The repository for order details data.
   */
  constructor(
    private staffRepository: IStaffRepository,
    private userRepository: IUserRepository,
    private relativeRepository: IRelativeRepository,
    private orderDetailsRepository: IOrderDetailsRepository
  ) {}

  /**
   * Executes the delete staff use case.
   * @async
   * @param {number} staffId - The ID of the staff to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(staffId: number): Promise<ResponseDTO> {
    try {
      const staffExist = (await this.staffRepository.findById(
        staffId
      )) as StaffDTO | null

      if (!staffExist) {
        return {
          data: { error: StaffErrorType.StaffNotExist },
          success: false,
        }
      }

      const orderExist =
        await this.orderDetailsRepository.findByStaffId(staffId)
      if (orderExist) {
        return {
          data: { error: StaffErrorType.OrderConstraint },
          success: false,
        }
      }

      await this.userRepository.deleteByStaffId(staffId)

      await this.relativeRepository.deleteByStaffId(staffId)

      const paginatedList =
        await this.orderDetailsRepository.findCheckedOrders(staffId)
      const ordersExist = paginatedList.body as OrderDetailsDTO[]

      if (ordersExist && ordersExist.length > 0) {
        for (var orderDetails of ordersExist) {
          await this.orderDetailsRepository.delete(orderDetails.id)
        }
      }

      await this.staffRepository.delete(staffId)

      return { data: { msg: StaffSuccessType.StaffDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
