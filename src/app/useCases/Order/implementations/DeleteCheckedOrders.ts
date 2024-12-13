import { OrderDetailsDTO } from '../../../../domain/dtos/OrderDetails/OrderDetails'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { OrderErrorType } from '../../../../domain/enums/order/ErrorType'
import { OrderSuccessType } from '../../../../domain/enums/order/SuccessType'
import { IOrderDetailsRepository } from '../../../repositories/OrderDetails'
import { IDeleteCheckedOrdersUseCase } from '../DeleteCheckedOrders'

/**
 * Use case for deleting checked orders.
 * @class
 * @implements {IDeleteCheckedOrdersUseCase}
 */
export class DeleteCheckedOrderUseCase implements IDeleteCheckedOrdersUseCase {
  /**
   * Creating an instance of DeleteOrderDetailsUseCase.
   * @constructor
   * @param {IOrderDetailsRepository} orderDetailsRepository - The repository for the orders data.
   */
  constructor(private orderDetailsRepository: IOrderDetailsRepository) {}

  /**
   * Executes the delete checked orders use case.
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(): Promise<ResponseDTO> {
    try {
      const paginatedList =
        await this.orderDetailsRepository.findCheckedOrders(-1)
      const ordersExist = paginatedList.body as OrderDetailsDTO[]

      if (!ordersExist || ordersExist.length < 0) {
        return {
          data: { error: OrderErrorType.OrderNotFound },
          success: false,
        }
      }

      for (var orderDetails of ordersExist) {
        await this.orderDetailsRepository.delete(orderDetails.id)
      }

      return {
        data: { msg: OrderSuccessType.OrderDeleted },
        success: true,
      }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
