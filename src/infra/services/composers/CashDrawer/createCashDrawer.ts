import { ICashDrawerRepository } from '../../../../app/repositories/CashDrawer'
import { ICreateCashDrawerUseCase } from '../../../../app/useCases/CashDrawer/CreateCashDrawer'
import { CreateCashDrawerUseCase } from '../../../../app/useCases/CashDrawer/implementations/CreateCashDrawer'
import { CreateCashDrawerController } from '../../../../presentation/http/controllers/CashDrawer/implementations/CreateCashDrawer'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CashDrawerRepository } from '../../../repositories/typeorm/CashDrawer'

/**
 * Composer function for creating and configuring the components required for cash drawer creation.
 * @function
 * @returns {IController} The configured cash drawer creation controller.
 */
export function createCashDrawerComposer(): IController {
  const repostory: ICashDrawerRepository = new CashDrawerRepository()
  const useCase: ICreateCashDrawerUseCase = new CreateCashDrawerUseCase(
    repostory
  )
  const controller: IController = new CreateCashDrawerController(useCase)
  return controller
}
