import { ResponseDTO } from '../../../../domain/dtos/Response'
import { CashFlowErrorType } from '../../../../domain/enums/cashFlow/ErrorType'
import { ICashFlowRepository } from '../../../repositories/CashFlow'
import { IGetAllCashFlowUseCase } from '../GetAllCashFlow'

/**
 * Use case for retrieving all cash flow statements.
 * @class
 * @implements {IGetAllCashFlowUseCase}
 */
export class GetAllCashFlowUseCase implements IGetAllCashFlowUseCase {
  /**
   * Creates an instance of GetAllCashFlowUseCase.
   * @constructor
   * @param {ICashFlowRepository} cashFlowRepository - The repository for cash flow statement data.
   */
  constructor(private cashFlowRepository: ICashFlowRepository) {}

  /**
   * Executes the retrieve all cash flow statements use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const cashFlows = await this.cashFlowRepository.findAll(page)

      if (cashFlows.total == 0) {
        return {
          data: { error: CashFlowErrorType.CashFlowNotFound },
          success: false,
        }
      }

      return { data: cashFlows, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
