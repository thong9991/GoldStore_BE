import { IGoldPriceRepository } from '../../../../app/repositories/GoldPrice'
import { IUserRepository } from '../../../../app/repositories/User'
import { UpdateAllGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/implementations/UpdateAllGoldPrice'
import { IUpdateAllGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/UpdateAllGoldPrice'
import { UpdateAllGoldPriceController } from '../../../../presentation/http/controllers/GoldPrice/implementations/UpdateAllGoldPrice'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GoldPriceRepository } from '../../../repositories/typeorm/GoldPrice'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for updating gold price data.
 * @function
 * @returns {IController} The configured gold price update controller.
 */
export function updateAllGoldPriceComposer(): IController {
  const goldPriceRepository: IGoldPriceRepository = new GoldPriceRepository()
  const userRepository: IUserRepository = new UserRepository()
  const useCase: IUpdateAllGoldPriceUseCase = new UpdateAllGoldPriceUseCase(
    goldPriceRepository,
    userRepository
  )
  const controller: IController = new UpdateAllGoldPriceController(useCase)
  return controller
}
