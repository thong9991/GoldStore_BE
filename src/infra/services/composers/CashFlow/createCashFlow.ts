import { ICashFlowRepository } from '../../../../app/repositories/CashFlow'
import { ICreateCashFlowUseCase } from '../../../../app/useCases/CashFlow/CreateCashFlow'
import { CreateCashFlowUseCase } from '../../../../app/useCases/CashFlow/implementations/CreateCashFlow'
import { CreateCashFlowController } from '../../../../presentation/http/controllers/CashFlow/implementations/CreateCashFlow'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CashFlowRepository } from '../../../repositories/typeorm/CashFlow'

/**
 * Composer function for creating and configuring the components required for cash flow statement creation.
 * @function
 * @returns {IController} The configured cash flow statement creation controller.
 */
export function createCashFlowComposer(): IController {
  const repostory: ICashFlowRepository = new CashFlowRepository()
  const useCase: ICreateCashFlowUseCase = new CreateCashFlowUseCase(repostory)
  const controller: IController = new CreateCashFlowController(useCase)
  return controller
}
