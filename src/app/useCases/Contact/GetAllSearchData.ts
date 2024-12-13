import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all search data.
 * @interface
 */
export interface IGetAllSearchDataUseCase {
  /**
   * Executes the get all search data use case.
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(): Promise<ResponseDTO>
}
