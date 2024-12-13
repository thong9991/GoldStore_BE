import { IGoldPriceRepository } from '../../../../app/repositories/GoldPrice'
import { ICreateGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/CreateGoldPrice'
import { CreateGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/implementations/CreateGoldPrice'
import { CreateGoldPriceController } from '../../../../presentation/http/controllers/GoldPrice/implementations/CreateGoldPrice'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GoldPriceRepository } from '../../../repositories/typeorm/GoldPrice'

/**
 * Composer function for creating and configuring the components required for gold price creation.
 * @function
 * @returns {IController} The configured gold price creation controller.
 */
export function createGoldPriceComposer(): IController {
  const repostory: IGoldPriceRepository = new GoldPriceRepository()
  const useCase: ICreateGoldPriceUseCase = new CreateGoldPriceUseCase(repostory)
  const controller: IController = new CreateGoldPriceController(useCase)
  return controller
}
