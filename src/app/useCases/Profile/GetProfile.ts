import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving the staff profile.
 * @interface
 */
export interface IGetProfileUseCase {
  /**
   * Executes the get staff profile use case.
   * @async
   * @param {number} userId - the ID of the user.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: number): Promise<ResponseDTO>
}
