import { IGoldPriceRepository } from '../../../../app/repositories/GoldPrice'
import { UpdateGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/implementations/UpdateGoldPrice'
import { IUpdateGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/UpdateGoldPrice'
import { UpdateGoldPriceController } from '../../../../presentation/http/controllers/GoldPrice/implementations/UpdateGoldPrice'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GoldPriceRepository } from '../../../repositories/typeorm/GoldPrice'

/**
 * Composer function for creating and configuring the components required for updating gold price information.
 * @function
 * @returns {IController} The configured gold price update controller.
 */
export function updateGoldPriceComposer(): IController {
  const repostory: IGoldPriceRepository = new GoldPriceRepository()
  const useCase: IUpdateGoldPriceUseCase = new UpdateGoldPriceUseCase(repostory)
  const controller: IController = new UpdateGoldPriceController(useCase)
  return controller
}
