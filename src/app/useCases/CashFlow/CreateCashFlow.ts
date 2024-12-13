import { ICreateCashFlowRequestDTO } from '../../../domain/dtos/CashFlow/CreateCashFlow'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new cash flow statement.
 * @interface
 */
export interface ICreateCashFlowUseCase {
  /**
   * Executes the create cash flow statement use case.
   * @async
   * @param {ICreateCashFlowRequestDTO} data - The data for creating a new cash flow statement.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateCashFlowRequestDTO): Promise<ResponseDTO>
}
