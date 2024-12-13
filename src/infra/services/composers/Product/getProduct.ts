import { IProductRepository } from '../../../../app/repositories/Product'
import { IGetAllProductUseCase } from '../../../../app/useCases/Product/GetAllProduct'
import { GetAllProductUseCase } from '../../../../app/useCases/Product/implementations/GetAllProduct'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GetProductController } from '../../../../presentation/http/controllers/Product/implementations/GetProduct'
import { ProductRepository } from '../../../repositories/typeorm/Product'

/**
 * Composer function for creating and configuring the components required for retrieving product information.
 * @function
 * @returns {IController} The configured product retrieval controller.
 */
export function getProductComposer(): IController {
  const repository: IProductRepository = new ProductRepository()
  const useCase: IGetAllProductUseCase = new GetAllProductUseCase(repository)
  const controller: IController = new GetProductController(useCase)
  return controller
}
