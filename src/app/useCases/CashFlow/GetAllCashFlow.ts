import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all cash flow statement.
 * @interface
 */
export interface IGetAllCashFlowUseCase {
  /**
   * Executes the get all cash flow statement use case.
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(page: number): Promise<ResponseDTO>
}
