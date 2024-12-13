import { ICreateProductRequestDTO } from '../../../domain/dtos/Product/CreateProduct'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new product.
 * @interface
 */
export interface ICreateProductUseCase {
  /**
   * Executes the create product use case.
   * @async
   * @param {ICreateProductRequestDTO} data - The data for creating a new product.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateProductRequestDTO): Promise<ResponseDTO>
}
