import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all user.
 * @interface
 */
export interface IGetAllUserUseCase {
  /**
   * Executes the get all user use case.
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(page: number): Promise<ResponseDTO>
}
