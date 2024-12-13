import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ProductErrorType } from '../../../../domain/enums/product/ErrorType'
import { IOrderSaleRepository } from '../../../repositories/OrderSale'
import { IProductRepository } from '../../../repositories/Product'
import { IGetProductByIdUseCase } from '../GetProductById'

/**
 * Use case for searching product.
 * @class
 * @implements {IGetProductByIdUseCase}
 */
export class GetProductByIdUseCase implements IGetProductByIdUseCase {
  /**
   * Creates an instance of GetProductByIdUseCase.
   * @constructor
   * @param {IProductRepository} productRepository - The repository for product data.
   * @param {IOrderSaleRepository} orderSaleRepository - The repository for the sale orders data.
   */
  constructor(
    private productRepository: IProductRepository,
    private orderSaleRepository: IOrderSaleRepository
  ) {}

  /**
   * Executes the search product use case.
   * @async
   * @param {number} productId - The ID of product to search for.
   * @returns {ResponseDTO} The response data.
   */
  async execute(productId: number): Promise<ResponseDTO> {
    try {
      const orderSaleExists =
        await this.orderSaleRepository.findByProductId(productId)

      if (orderSaleExists) {
        return { data: { error: ProductErrorType.SoldProduct }, success: false }
      }
      const product = await this.productRepository.findById(productId)

      if (!product) {
        return {
          data: { error: ProductErrorType.ProductNotExist },
          success: true,
        }
      }

      return { data: product, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
