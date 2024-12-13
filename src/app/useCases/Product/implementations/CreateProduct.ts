import { ICreateProductRequestDTO } from '../../../../domain/dtos/Product/CreateProduct'
import { ProductCategory } from '../../../../domain/dtos/Product/Product'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ProductEntity } from '../../../../domain/entities/Product'
import { IProductRepository } from '../../../repositories/Product'
import { ICreateProductUseCase } from '../CreateProduct'

/**
 * Use case for creating a new product.
 * @class
 * @implements {ICreateProductUseCase}
 */
export class CreateProductUseCase implements ICreateProductUseCase {
  /**
   * Creates an instance of CreateProductUseCase.
   * @constructor
   * @param {IProductRepository} productRepository - The repository for the products data.
   */
  constructor(private productRepository: IProductRepository) {}

  /**
   * Executes the create product use case.
   * @async
   * @param {ICreateProductRequestDTO} data - The creating product request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    productName,
    category,
    goldPrice,
    totalWeight,
    goldWeight,
    gemWeight,
    wage,
    vendor,
  }: ICreateProductRequestDTO): Promise<ResponseDTO> {
    try {
      const convertCategory = category as ProductCategory
      const productEntity = ProductEntity.create({
        productName,
        category: convertCategory,
        goldPrice,
        totalWeight,
        goldWeight,
        gemWeight,
        wage,
        vendor,
      })

      const product = await this.productRepository.create(productEntity)

      return { data: product, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
