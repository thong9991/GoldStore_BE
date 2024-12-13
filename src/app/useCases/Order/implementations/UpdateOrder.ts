import { OrderDetailsDTO } from '../../../../domain/dtos/OrderDetails/OrderDetails'
import { IUpdateOrderDetailsRequestDTO } from '../../../../domain/dtos/OrderDetails/UpdateOrderDetails'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { OrderDetailsEntity } from '../../../../domain/entities/OrderDetails'
import { OrderErrorType } from '../../../../domain/enums/order/ErrorType'
import { IOrderDetailsRepository } from '../../../repositories/OrderDetails'
import { IUpdateOrderUseCase } from '../UpdateOrder'

/**
 * Use case for updating order information.
 * @class
 * @implements {IUpdateOrderUseCase}
 */
export class UpdateOrderUseCase implements IUpdateOrderUseCase {
  /**
   * Creates an instance of UpdateOrderDetailsUseCase.
   * @constructor
   * @param {IOrderDetailsRepository} orderDetailsRepository - The repository for the orders data.
   */
  constructor(private orderDetailsRepository: IOrderDetailsRepository) {}

  /**
   * Executes the update order use case.
   * @async
   * @param {string} orderId - The ID of the order to be updated.
   * @param {IUpdateOrderDetailsRequestDTO} requestData - The updated order information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    orderId: string,
    {
      total,
      goldToCash,
      discount,
      isChecked,
      description,
    }: IUpdateOrderDetailsRequestDTO
  ): Promise<ResponseDTO> {
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

      const orderEntity = OrderDetailsEntity.update({
        total,
        goldToCash,
        discount,
        isChecked,
        description,
      })
      const order = await this.orderDetailsRepository.update(
        orderExist,
        orderEntity
      )

      return { data: order, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
