import { ICreateCashFlowRequestDTO } from '../../../../domain/dtos/CashFlow/CreateCashFlow'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { CashFlowEntity } from '../../../../domain/entities/CashFlow'
import { ICashFlowRepository } from '../../../repositories/CashFlow'
import { ICreateCashFlowUseCase } from '../CreateCashFlow'

/**
 * Use case for creating a new cash flow statement.
 * @class
 * @implements {ICreateCashFlowUseCase}
 */
export class CreateCashFlowUseCase implements ICreateCashFlowUseCase {
  /**
   * Creates an instance of CreateCashFlowUseCase.
   * @constructor
   * @param {ICashFlowRepository} cashFlowRepository - The repository for the cash flow statements data.
   */
  constructor(private cashFlowRepository: ICashFlowRepository) {}

  /**
   * Executes the create cash flow statement use case.
   * @async
   * @param {ICreateCashFlowRequestDTO} data - The creating cash flow statement request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    asset,
    amount,
  }: ICreateCashFlowRequestDTO): Promise<ResponseDTO> {
    try {
      const cashFlowEntity = CashFlowEntity.create({
        asset,
        amount,
      })

      const cashFlow = await this.cashFlowRepository.create(cashFlowEntity)

      return { data: cashFlow, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
