import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ProductErrorType } from '../../../../domain/enums/product/ErrorType'
import { IProductRepository } from '../../../repositories/Product'
import { IGetAllProductUseCase } from '../GetAllProduct'

/**
 * Use case for retrieving all products.
 * @class
 * @implements {IGetAllProductUseCase}
 */
export class GetAllProductUseCase implements IGetAllProductUseCase {
  /**
   * Creates an instance of GetAllProductUseCase.
   * @constructor
   * @param {IProductRepository} productRepository - The repository for product data.
   */
  constructor(private productRepository: IProductRepository) {}

  /**
   * Executes the retrieve all products use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const products = await this.productRepository.findAll(page)

      if (products.total == 0) {
        return {
          data: { error: ProductErrorType.ProductNotFound },
          success: false,
        }
      }

      return { data: products, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
