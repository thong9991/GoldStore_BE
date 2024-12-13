import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a user.
 * @interface
 */
export interface IDeleteUserUseCase {
  /**
   * Executes the delete user use case.
   * @async
   * @param {number} userId - The ID of the user to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: number): Promise<ResponseDTO>
}
