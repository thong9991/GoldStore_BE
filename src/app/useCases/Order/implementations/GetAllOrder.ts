import { ResponseDTO } from '../../../../domain/dtos/Response'
import { OrderErrorType } from '../../../../domain/enums/order/ErrorType'
import { IOrderDetailsRepository } from '../../../repositories/OrderDetails'
import { IGetAllOrderUseCase } from '../GetAllOrder'

/**
 * Use case for retrieving all orders.
 * @class
 * @implements {IGetAllOrderUseCase}
 */
export class GetAllOrderUseCase implements IGetAllOrderUseCase {
  /**
   * Creates an instance of GetAllOrderUseCase.
   * @constructor
   * @param {IOrderDetailsRepository} orderDetailsRepository - The repository for order details data.
   */
  constructor(private orderDetailsRepository: IOrderDetailsRepository) {}

  /**
   * Executes the retrieve all orders use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const orders = await this.orderDetailsRepository.findAll(page)

      if (orders.total == 0) {
        return {
          data: { error: OrderErrorType.OrderNotFound },
          success: false,
        }
      }

      return { data: orders, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
