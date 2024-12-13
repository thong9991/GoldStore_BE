import { IProductRepository } from '../../../../app/repositories/Product'
import { UpdateProductUseCase } from '../../../../app/useCases/Product/implementations/UpdateProduct'
import { IUpdateProductUseCase } from '../../../../app/useCases/Product/UpdateProduct'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateProductController } from '../../../../presentation/http/controllers/Product/implementations/UpdateProduct'
import { ProductRepository } from '../../../repositories/typeorm/Product'

/**
 * Composer function for creating and configuring the components required for updating product information.
 * @function
 * @returns {IController} The configured product update controller.
 */
export function updateProductComposer(): IController {
  const repostory: IProductRepository = new ProductRepository()
  const useCase: IUpdateProductUseCase = new UpdateProductUseCase(repostory)
  const controller: IController = new UpdateProductController(useCase)
  return controller
}
