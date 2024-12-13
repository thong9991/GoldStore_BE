import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a cash flow statement.
 * @interface
 */
export interface IDeleteCashFlowUseCase {
  /**
   * Executes the delete cash flow statement use case.
   * @async
   * @param {number} cashFlowId - The ID of the cash flow statement to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(cashFlowId: number): Promise<ResponseDTO>
}
