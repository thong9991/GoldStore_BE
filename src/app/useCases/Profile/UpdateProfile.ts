import { ResponseDTO } from '../../../domain/dtos/Response'
import { IUpdateStaffRequestDTO } from '../../../domain/dtos/Staff/UpdateStaff'

/**
 * Interface for the use case of updating personal information.
 * @interface
 */
export interface IUpdateProfileUseCase {
  /**
   * Executes the update personal profile use case.
   * @async
   * @param {number} userId - The ID of the staff to be updated.
   * @param {IUpdateStaffRequestDTO} data - The data for updating profile.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: number, data: IUpdateStaffRequestDTO): Promise<ResponseDTO>
}
