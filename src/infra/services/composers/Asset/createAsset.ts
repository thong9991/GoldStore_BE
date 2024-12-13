import { IAssetRepository } from '../../../../app/repositories/Asset'
import { ICreateAssetUseCase } from '../../../../app/useCases/Asset/CreateAsset'
import { CreateAssetUseCase } from '../../../../app/useCases/Asset/implementations/CreateAsset'
import { CreateAssetController } from '../../../../presentation/http/controllers/Asset/implementations/CreateAsset'
import { IController } from '../../../../presentation/http/controllers/IController'
import { AssetRepository } from '../../../repositories/typeorm/Asset'

/**
 * Composer function for creating and configuring the components required for asset creation.
 * @function
 * @returns {IController} The configured asset creation controller.
 */
export function createAssetComposer(): IController {
  const repostory: IAssetRepository = new AssetRepository()
  const useCase: ICreateAssetUseCase = new CreateAssetUseCase(repostory)
  const controller: IController = new CreateAssetController(useCase)
  return controller
}
