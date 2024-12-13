import { ICashFlowRepository } from '../../../../app/repositories/CashFlow'
import { IDeleteCashFlowUseCase } from '../../../../app/useCases/CashFlow/DeleteCashFlow'
import { DeleteCashFlowUseCase } from '../../../../app/useCases/CashFlow/implementations/DeleteCashFlow'
import { DeleteCashFlowController } from '../../../../presentation/http/controllers/CashFlow/implementations/DeleteCashFlow'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CashFlowRepository } from '../../../repositories/typeorm/CashFlow'

/**
 * Composer function for creating and configuring the components required for cash flow statement deletion.
 * @function
 * @returns {IController} The configured cash flow statement deletion controller.
 */
export function deleteCashFlowComposer(): IController {
  const repostory: ICashFlowRepository = new CashFlowRepository()
  const useCase: IDeleteCashFlowUseCase = new DeleteCashFlowUseCase(repostory)
  const controller: IController = new DeleteCashFlowController(useCase)
  return controller
}
