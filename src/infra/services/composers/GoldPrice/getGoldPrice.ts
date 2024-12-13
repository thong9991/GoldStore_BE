import { IGoldPriceRepository } from '../../../../app/repositories/GoldPrice'
import { IGetAllGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/GetAllGoldPrice'
import { GetAllGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/implementations/GetAllGoldPrice'
import { GetGoldPriceController } from '../../../../presentation/http/controllers/GoldPrice/implementations/GetGoldPrice'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GoldPriceRepository } from '../../../repositories/typeorm/GoldPrice'

/**
 * Composer function for creating and configuring the components required for retrieving gold price information.
 * @function
 * @returns {IController} The configured gold price retrieval controller.
 */
export function getGoldPriceComposer(): IController {
  const repository: IGoldPriceRepository = new GoldPriceRepository()
  const useCase: IGetAllGoldPriceUseCase = new GetAllGoldPriceUseCase(
    repository
  )
  const controller: IController = new GetGoldPriceController(useCase)
  return controller
}
