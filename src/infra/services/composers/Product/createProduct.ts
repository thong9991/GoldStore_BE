import { IProductRepository } from '../../../../app/repositories/Product'
import { ICreateProductUseCase } from '../../../../app/useCases/Product/CreateProduct'
import { CreateProductUseCase } from '../../../../app/useCases/Product/implementations/CreateProduct'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CreateProductController } from '../../../../presentation/http/controllers/Product/implementations/CreateProduct'
import { ProductRepository } from '../../../repositories/typeorm/Product'

/**
 * Composer function for creating and configuring the components required for product creation.
 * @function
 * @returns {IController} The configured product creation controller.
 */
export function createProductComposer(): IController {
  const repostory: IProductRepository = new ProductRepository()
  const useCase: ICreateProductUseCase = new CreateProductUseCase(repostory)
  const controller: IController = new CreateProductController(useCase)
  return controller
}
