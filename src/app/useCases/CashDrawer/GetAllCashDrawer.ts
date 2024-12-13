import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all cash drawer.
 * @interface
 */
export interface IGetAllCashDrawerUseCase {
  /**
   * Executes the get all cash drawer use case.
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(page: number): Promise<ResponseDTO>
}
