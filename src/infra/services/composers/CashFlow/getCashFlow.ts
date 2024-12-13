import { ICashFlowRepository } from '../../../../app/repositories/CashFlow'
import { IGetAllCashFlowUseCase } from '../../../../app/useCases/CashFlow/GetAllCashFlow'
import { GetAllCashFlowUseCase } from '../../../../app/useCases/CashFlow/implementations/GetAllCashFlow'
import { GetCashFlowController } from '../../../../presentation/http/controllers/CashFlow/implementations/GetCashFlow'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CashFlowRepository } from '../../../repositories/typeorm/CashFlow'

/**
 * Composer function for creating and configuring the components required for retrieving cash flow statement information.
 * @function
 * @returns {IController} The configured cash flow statement retrieval controller.
 */
export function getCashFlowComposer(): IController {
  const repository: ICashFlowRepository = new CashFlowRepository()
  const useCase: IGetAllCashFlowUseCase = new GetAllCashFlowUseCase(repository)
  const controller: IController = new GetCashFlowController(useCase)
  return controller
}
