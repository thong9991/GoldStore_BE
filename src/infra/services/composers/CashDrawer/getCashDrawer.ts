import { ICashDrawerRepository } from '../../../../app/repositories/CashDrawer'
import { IGetAllCashDrawerUseCase } from '../../../../app/useCases/CashDrawer/GetAllCashDrawer'
import { GetAllCashDrawerUseCase } from '../../../../app/useCases/CashDrawer/implementations/GetAllCashDrawer'
import { GetCashDrawerController } from '../../../../presentation/http/controllers/CashDrawer/implementations/GetCashDrawer'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CashDrawerRepository } from '../../../repositories/typeorm/CashDrawer'

/**
 * Composer function for creating and configuring the components required for retrieving cash drawer information.
 * @function
 * @returns {IController} The configured cash drawer retrieval controller.
 */
export function getCashDrawerComposer(): IController {
  const repository: ICashDrawerRepository = new CashDrawerRepository()
  const useCase: IGetAllCashDrawerUseCase = new GetAllCashDrawerUseCase(
    repository
  )
  const controller: IController = new GetCashDrawerController(useCase)
  return controller
}
