import { IOrderSaleRepository } from '../../../../app/repositories/OrderSale'
import { IProductRepository } from '../../../../app/repositories/Product'
import { IGetProductByIdUseCase } from '../../../../app/useCases/Product/GetProductById'
import { GetProductByIdUseCase } from '../../../../app/useCases/Product/implementations/GetProductById'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GetProductByIdController } from '../../../../presentation/http/controllers/Product/implementations/GetProductById'
import { OrderSaleRepository } from '../../../repositories/typeorm/OrderSale'
import { ProductRepository } from '../../../repositories/typeorm/Product'

/**
 * Composer function for creating and configuring the components required for retrieving product information.
 * @function
 * @returns {IController} The configured product retrieval controller.
 */
export function getProductByIdComposer(): IController {
  const productRepository: IProductRepository = new ProductRepository()
  const orderSaleRepository: IOrderSaleRepository = new OrderSaleRepository()
  const useCase: IGetProductByIdUseCase = new GetProductByIdUseCase(
    productRepository,
    orderSaleRepository
  )
  const controller: IController = new GetProductByIdController(useCase)
  return controller
}
