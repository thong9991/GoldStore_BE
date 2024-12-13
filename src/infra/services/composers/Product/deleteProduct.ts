import { IOrderSaleRepository } from '../../../../app/repositories/OrderSale'
import { IProductRepository } from '../../../../app/repositories/Product'
import { IDeleteProductUseCase } from '../../../../app/useCases/Product/DeleteProduct'
import { DeleteProductUseCase } from '../../../../app/useCases/Product/implementations/DeleteProduct'
import { IController } from '../../../../presentation/http/controllers/IController'
import { DeleteProductController } from '../../../../presentation/http/controllers/Product/implementations/DeleteProduct'
import { OrderSaleRepository } from '../../../repositories/typeorm/OrderSale'
import { ProductRepository } from '../../../repositories/typeorm/Product'

/**
 * Composer function for creating and configuring the components required for product deletion.
 * @function
 * @returns {IController} The configured product deletion controller.
 */
export function deleteProductComposer(): IController {
  const productRepostory: IProductRepository = new ProductRepository()
  const orderSaleRepository: IOrderSaleRepository = new OrderSaleRepository()
  const useCase: IDeleteProductUseCase = new DeleteProductUseCase(
    productRepostory,
    orderSaleRepository
  )
  const controller: IController = new DeleteProductController(useCase)
  return controller
}
