import { ResponseDTO } from '../../../domain/dtos/Response'
import { IUpdateProductRequestDTO } from '../../../domain/dtos/Product/UpdateProduct'

/**
 * Interface for the use case of updating product information.
 * @interface
 */
export interface IUpdateProductUseCase {
  /**
   * Executes the update product use case.
   * @async
   * @param {number} productId - The ID of the product to be updated.
   * @param {IUpdateProductRequestDTO} data - The data for updating product information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    productId: number,
    data: IUpdateProductRequestDTO
  ): Promise<ResponseDTO>
}
