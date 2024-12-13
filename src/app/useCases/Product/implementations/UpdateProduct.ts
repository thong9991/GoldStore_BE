import { ProductDTO } from '../../../../domain/dtos/Product/Product'
import { IUpdateProductRequestDTO } from '../../../../domain/dtos/Product/UpdateProduct'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ProductEntity } from '../../../../domain/entities/Product'
import { ProductErrorType } from '../../../../domain/enums/product/ErrorType'
import { IProductRepository } from '../../../repositories/Product'
import { IUpdateProductUseCase } from '../UpdateProduct'

/**
 * Use case for updating product information.
 * @class
 * @implements {IUpdateProductUseCase}
 */
export class UpdateProductUseCase implements IUpdateProductUseCase {
  /**
   * Creates an instance of UpdateProductUseCase.
   * @constructor
   * @param {IProductRepository} productRepository - The repository for the products data.
   */
  constructor(private productRepository: IProductRepository) {}

  /**
   * Executes the update product use case.
   * @async
   * @param {number} productId - The ID of the product to be updated.
   * @param {IUpdateProductRequestDTO} requestData - The updated product information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    productId: number,
    {
      productName,
      category,
      goldPrice,
      totalWeight,
      goldWeight,
      gemWeight,
      wage,
      vendor,
    }: IUpdateProductRequestDTO
  ): Promise<ResponseDTO> {
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

      const productEntity = ProductEntity.update({
        productName,
        category,
        goldPrice,
        totalWeight,
        goldWeight,
        gemWeight,
        wage,
        vendor,
      })
      const product = await this.productRepository.update(
        productExist,
        productEntity
      )

      return { data: product, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
