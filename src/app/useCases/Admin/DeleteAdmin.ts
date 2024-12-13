import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a admin.
 * @interface
 */
export interface IDeleteAdminUseCase {
  /**
   * Executes the delete admin use case.
   * @async
   * @param {number} adminId - The ID of the admin to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(adminId: number): Promise<ResponseDTO>
}
