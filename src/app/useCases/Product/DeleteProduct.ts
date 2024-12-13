import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a product.
 * @interface
 */
export interface IDeleteProductUseCase {
  /**
   * Executes the delete product use case.
   * @async
   * @param {number} productId - The ID of the product to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(productId: number): Promise<ResponseDTO>
}
