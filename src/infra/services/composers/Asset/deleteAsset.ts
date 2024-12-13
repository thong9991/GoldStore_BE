import { IAssetRepository } from '../../../../app/repositories/Asset'
import { ICashFlowRepository } from '../../../../app/repositories/CashFlow'
import { IDeleteAssetUseCase } from '../../../../app/useCases/Asset/DeleteAsset'
import { DeleteAssetUseCase } from '../../../../app/useCases/Asset/implementations/DeleteAsset'
import { DeleteAssetController } from '../../../../presentation/http/controllers/Asset/implementations/DeleteAsset'
import { IController } from '../../../../presentation/http/controllers/IController'
import { AssetRepository } from '../../../repositories/typeorm/Asset'
import { CashFlowRepository } from '../../../repositories/typeorm/CashFlow'

/**
 * Composer function for creating and configuring the components required for asset deletion.
 * @function
 * @returns {IController} The configured asset deletion controller.
 */
export function deleteAssetComposer(): IController {
  const assetRepostory: IAssetRepository = new AssetRepository()
  const cashFlowRepository: ICashFlowRepository = new CashFlowRepository()
  const useCase: IDeleteAssetUseCase = new DeleteAssetUseCase(
    assetRepostory,
    cashFlowRepository
  )
  const controller: IController = new DeleteAssetController(useCase)
  return controller
}
