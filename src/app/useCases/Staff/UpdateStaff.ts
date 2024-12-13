import { ResponseDTO } from '../../../domain/dtos/Response'
import { IUpdateStaffRequestDTO } from '../../../domain/dtos/Staff/UpdateStaff'

/**
 * Interface for the use case of updating staff information.
 * @interface
 */
export interface IUpdateStaffUseCase {
  /**
   * Executes the update staff use case.
   * @async
   * @param {number} staffId - The ID of the staff to be updated.
   * @param {IUpdateStaffRequestDTO} data - The data for updating staff information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(staffId: number, data: IUpdateStaffRequestDTO): Promise<ResponseDTO>
}
