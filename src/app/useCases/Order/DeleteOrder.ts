import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a order.
 * @interface
 */
export interface IDeleteOrderUseCase {
  /**
   * Executes the delete order use case.
   * @async
   * @param {string} orderId - The ID of the order to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(orderId: string): Promise<ResponseDTO>
}
