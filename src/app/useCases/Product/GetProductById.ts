import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of searching a product.
 * @interface
 */
export interface IGetProductByIdUseCase {
  /**
   * Executes the product search use case.
   * @async
   * @param {number} productId - The ID of the product to search for.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(productId: number): Promise<ResponseDTO>
}
