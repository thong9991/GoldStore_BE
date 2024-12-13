import { IAssetRepository } from '../../../../app/repositories/Asset'
import { ICashDrawerRepository } from '../../../../app/repositories/CashDrawer'
import { IDeleteCashDrawerUseCase } from '../../../../app/useCases/CashDrawer/DeleteCashDrawer'
import { DeleteCashDrawerUseCase } from '../../../../app/useCases/CashDrawer/implementations/DeleteCashDrawer'
import { DeleteCashDrawerController } from '../../../../presentation/http/controllers/CashDrawer/implementations/DeleteCashDrawer'
import { IController } from '../../../../presentation/http/controllers/IController'
import { AssetRepository } from '../../../repositories/typeorm/Asset'
import { CashDrawerRepository } from '../../../repositories/typeorm/CashDrawer'

/**
 * Composer function for creating and configuring the components required for cash drawer deletion.
 * @function
 * @returns {IController} The configured cash drawer deletion controller.
 */
export function deleteCashDrawerComposer(): IController {
  const cashDrawerRepostory: ICashDrawerRepository = new CashDrawerRepository()
  const assetRepository: IAssetRepository = new AssetRepository()
  const useCase: IDeleteCashDrawerUseCase = new DeleteCashDrawerUseCase(
    cashDrawerRepostory,
    assetRepository
  )
  const controller: IController = new DeleteCashDrawerController(useCase)
  return controller
}
