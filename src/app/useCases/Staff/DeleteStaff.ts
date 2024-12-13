import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a staff.
 * @interface
 */
export interface IDeleteStaffUseCase {
  /**
   * Executes the delete staff use case.
   * @async
   * @param {number} staffId - The ID of the staff to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(staffId: number): Promise<ResponseDTO>
}
