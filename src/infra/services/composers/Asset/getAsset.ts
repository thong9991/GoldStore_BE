import { IAssetRepository } from '../../../../app/repositories/Asset'
import { IGetAllAssetUseCase } from '../../../../app/useCases/Asset/GetAllAsset'
import { GetAllAssetUseCase } from '../../../../app/useCases/Asset/implementations/GetAllAsset'
import { GetAssetController } from '../../../../presentation/http/controllers/Asset/implementations/GetAsset'
import { IController } from '../../../../presentation/http/controllers/IController'
import { AssetRepository } from '../../../repositories/typeorm/Asset'

/**
 * Composer function for creating and configuring the components required for retrieving asset information.
 * @function
 * @returns {IController} The configured asset retrieval controller.
 */
export function getAssetComposer(): IController {
  const repository: IAssetRepository = new AssetRepository()
  const useCase: IGetAllAssetUseCase = new GetAllAssetUseCase(repository)
  const controller: IController = new GetAssetController(useCase)
  return controller
}
