import { ResponseDTO } from '../../../../domain/dtos/Response'
import { StaffDTO } from '../../../../domain/dtos/Staff/Staff'
import { IUpdateStaffRequestDTO } from '../../../../domain/dtos/Staff/UpdateStaff'
import { StaffEntity } from '../../../../domain/entities/Staff'
import { StaffErrorType } from '../../../../domain/enums/staff/ErrorType'
import { IStaffRepository } from '../../../repositories/Staff'
import { IUpdateStaffUseCase } from '../UpdateStaff'

/**
 * Use case for updating staff information.
 * @class
 * @implements {IUpdateStaffUseCase}
 */
export class UpdateStaffUseCase implements IUpdateStaffUseCase {
  /**
   * Creates an instance of UpdateStaffUseCase.
   * @constructor
   * @param {IStaffRepository} staffRepository - The repository for the staffs data.
   */
  constructor(private staffRepository: IStaffRepository) {}

  /**
   * Executes the update staff use case.
   * @async
   * @param {number} staffId - The ID of the staff to be updated.
   * @param {IUpdateStaffRequestDTO} requestData - The updated staff information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    staffId: number,
    { firstName, lastName, phone, address }: IUpdateStaffRequestDTO
  ): Promise<ResponseDTO> {
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

      const staffEntity = StaffEntity.update({
        firstName,
        lastName,
        phone,
        address,
      })
      const staff = await this.staffRepository.update(staffExist, staffEntity)

      return { data: staff, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
