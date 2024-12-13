import { ICreateOrderDetailsRequestDTO } from '../../../domain/dtos/OrderDetails/CreateOrderDetails'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new order.
 * @interface
 */
export interface ICreateOrderUseCase {
  /**
   * Executes the create order use case.
   * @async
   * @param {number} userId - the ID of the user.
   * @param {ICreateOrderDetailsRequestDTO} data - The data for creating a new order.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    userId: number,
    data: ICreateOrderDetailsRequestDTO
  ): Promise<ResponseDTO>
}
