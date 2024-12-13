import { ResponseDTO } from '../../../../domain/dtos/Response'
import { StaffErrorType } from '../../../../domain/enums/staff/ErrorType'
import { IStaffRepository } from '../../../repositories/Staff'
import { IGetAllStaffUseCase } from '../GetAllStaff'

/**
 * Use case for retrieving all staffs.
 * @class
 * @implements {IGetAllStaffUseCase}
 */
export class GetAllStaffUseCase implements IGetAllStaffUseCase {
  /**
   * Creates an instance of GetAllStaffUseCase.
   * @constructor
   * @param {IStaffRepository} staffRepository - The repository for staff data.
   */
  constructor(private staffRepository: IStaffRepository) {}

  /**
   * Executes the retrieve all staffs use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      if (page == -1) {
        const staffs = await this.staffRepository.findAllDataNoPaging()
        return { data: staffs, success: true }
      }

      const staffs = await this.staffRepository.findAll(page)

      if (staffs.total == 0) {
        return {
          data: { error: StaffErrorType.StaffNotFound },
          success: false,
        }
      }

      return { data: staffs, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
