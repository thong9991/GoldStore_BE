import { ICashDrawerRepository } from '../../../../app/repositories/CashDrawer'
import { UpdateCashDrawerUseCase } from '../../../../app/useCases/CashDrawer/implementations/UpdateCashDrawer'
import { IUpdateCashDrawerUseCase } from '../../../../app/useCases/CashDrawer/UpdateCashDrawer'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateCashDrawerController } from '../../../../presentation/http/controllers/CashDrawer/implementations/UpdateCashDrawer'
import { CashDrawerRepository } from '../../../repositories/typeorm/CashDrawer'

/**
 * Composer function for creating and configuring the components required for updating cash drawer information.
 * @function
 * @returns {IController} The configured cash drawer update controller.
 */
export function updateCashDrawerComposer(): IController {
  const repostory: ICashDrawerRepository = new CashDrawerRepository()
  const useCase: IUpdateCashDrawerUseCase = new UpdateCashDrawerUseCase(
    repostory
  )
  const controller: IController = new UpdateCashDrawerController(useCase)
  return controller
}
