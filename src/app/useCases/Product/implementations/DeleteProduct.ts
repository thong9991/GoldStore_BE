import { ProductDTO } from '../../../../domain/dtos/Product/Product'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ProductErrorType } from '../../../../domain/enums/product/ErrorType'
import { ProductSuccessType } from '../../../../domain/enums/product/SuccessType'
import { IOrderSaleRepository } from '../../../repositories/OrderSale'
import { IProductRepository } from '../../../repositories/Product'
import { IDeleteProductUseCase } from '../DeleteProduct'

/**
 * Use case for deleting product.
 * @class
 * @implements {IDeleteProductUseCase}
 */
export class DeleteProductUseCase implements IDeleteProductUseCase {
  /**
   * Creating an instance of DeleteProductUseCase.
   * @constructor
   * @param {IProductRepository} productRepository - The repository for the products data.
   * @param {IOrderSaleRepository} orderSaleRepository - The repository for the sale orders data.
   */
  constructor(
    private productRepository: IProductRepository,
    private orderSaleRepository: IOrderSaleRepository
  ) {}

  /**
   * Executes the delete product use case.
   * @async
   * @param {number} productId - The ID of the product to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(productId: number): Promise<ResponseDTO> {
    try {
      const productExist = (await this.productRepository.findById(
        productId
      )) as ProductDTO | null

      if (!productExist) {
        return {
          data: { error: ProductErrorType.ProductNotExist },
          success: false,
        }
      }

      const orderExist =
        await this.orderSaleRepository.findByProductId(productId)
      if (orderExist) {
        return {
          data: { error: ProductErrorType.OrderConstraint },
          success: false,
        }
      }

      await this.productRepository.delete(productId)

      return { data: { msg: ProductSuccessType.ProductDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
