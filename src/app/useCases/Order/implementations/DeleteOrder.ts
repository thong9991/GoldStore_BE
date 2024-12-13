import { OrderDetailsDTO } from '../../../../domain/dtos/OrderDetails/OrderDetails'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { OrderErrorType } from '../../../../domain/enums/order/ErrorType'
import { OrderSuccessType } from '../../../../domain/enums/order/SuccessType'
import { IOrderDetailsRepository } from '../../../repositories/OrderDetails'
import { IDeleteOrderUseCase } from '../DeleteOrder'

/**
 * Use case for deleting order.
 * @class
 * @implements {IDeleteOrderUseCase}
 */
export class DeleteOrderUseCase implements IDeleteOrderUseCase {
  /**
   * Creating an instance of DeleteOrderDetailsUseCase.
   * @constructor
   * @param {IOrderDetailsRepository} orderDetailsRepository - The repository for the orders data.
   */
  constructor(private orderDetailsRepository: IOrderDetailsRepository) {}

  /**
   * Executes the delete order use case.
   * @async
   * @param {string} orderId - The ID of the order to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(orderId: string): Promise<ResponseDTO> {
    try {
      const orderExist = (await this.orderDetailsRepository.findById(
        orderId
      )) as OrderDetailsDTO | null

      if (!orderExist) {
        return {
          data: { error: OrderErrorType.OrderNotExist },
          success: false,
        }
      }
      await this.orderDetailsRepository.delete(orderId)

      return {
        data: { msg: OrderSuccessType.OrderDeleted },
        success: true,
      }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
