import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all contact.
 * @interface
 */
export interface IGetAllContactUseCase {
  /**
   * Executes the get all contact use case.
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(page: number): Promise<ResponseDTO>
}
