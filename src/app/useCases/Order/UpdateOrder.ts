import { IUpdateOrderDetailsRequestDTO } from '../../../domain/dtos/OrderDetails/UpdateOrderDetails'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating order information.
 * @interface
 */
export interface IUpdateOrderUseCase {
  /**
   * Executes the update order use case.
   * @async
   * @param {string} orderId - The ID of the order to be updated.
   * @param {IUpdateOrderDetailsRequestDTO} data - The data for updating order information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    orderId: string,
    data: IUpdateOrderDetailsRequestDTO
  ): Promise<ResponseDTO>
}
