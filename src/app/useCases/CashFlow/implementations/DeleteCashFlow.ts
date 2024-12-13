import { CashFlowDTO } from '../../../../domain/dtos/CashFlow/CashFlow'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { CashFlowErrorType } from '../../../../domain/enums/cashFlow/ErrorType'
import { CashFlowSuccessType } from '../../../../domain/enums/cashFlow/SuccessType'
import { ICashFlowRepository } from '../../../repositories/CashFlow'
import { IDeleteCashFlowUseCase } from '../DeleteCashFlow'

/**
 * Use case for deleting cash flow statement.
 * @class
 * @implements {IDeleteCashFlowUseCase}
 */
export class DeleteCashFlowUseCase implements IDeleteCashFlowUseCase {
  /**
   * Creating an instance of DeleteCashFlowUseCase.
   * @constructor
   * @param {ICashFlowRepository} cashFlowRepository - The repository for the cash flow statements data.
   */
  constructor(private cashFlowRepository: ICashFlowRepository) {}

  /**
   * Executes the delete cash flow statement use case.
   * @async
   * @param {number} cashFlowId - The ID of the cash flow statement to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(cashFlowId: number): Promise<ResponseDTO> {
    try {
      const cashFlowExist = (await this.cashFlowRepository.findById(
        cashFlowId
      )) as CashFlowDTO | null

      if (!cashFlowExist) {
        return {
          data: { error: CashFlowErrorType.CashFlowNotExist },
          success: false,
        }
      }

      await this.cashFlowRepository.delete(cashFlowId)

      return {
        data: { msg: CashFlowSuccessType.CashFlowDeleted },
        success: true,
      }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
