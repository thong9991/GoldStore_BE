import { IGoldPriceRepository } from '../../../../app/repositories/GoldPrice'
import { IOrderExchangeRepository } from '../../../../app/repositories/OrderExchange'
import { IProductRepository } from '../../../../app/repositories/Product'
import { IDeleteGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/DeleteGoldPrice'
import { DeleteGoldPriceUseCase } from '../../../../app/useCases/GoldPrice/implementations/DeleteGoldPrice'
import { DeleteGoldPriceController } from '../../../../presentation/http/controllers/GoldPrice/implementations/DeleteGoldPrice'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GoldPriceRepository } from '../../../repositories/typeorm/GoldPrice'
import { OrderExchangeRepository } from '../../../repositories/typeorm/OrderExchange'
import { ProductRepository } from '../../../repositories/typeorm/Product'

/**
 * Composer function for creating and configuring the components required for gold price deletion.
 * @function
 * @returns {IController} The configured gold price deletion controller.
 */
export function deleteGoldPriceComposer(): IController {
  const goldPriceRepository: IGoldPriceRepository = new GoldPriceRepository()
  const productRepository: IProductRepository = new ProductRepository()
  const orderExchangeRepository: IOrderExchangeRepository =
    new OrderExchangeRepository()
  const useCase: IDeleteGoldPriceUseCase = new DeleteGoldPriceUseCase(
    goldPriceRepository,
    productRepository,
    orderExchangeRepository
  )
  const controller: IController = new DeleteGoldPriceController(useCase)
  return controller
}
