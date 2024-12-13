import { IStaffRepository } from '../../../../app/repositories/Staff'
import { ICreateOrderDetailsRequestDTO } from '../../../../domain/dtos/OrderDetails/CreateOrderDetails'
import { OrderDetailsDTO } from '../../../../domain/dtos/OrderDetails/OrderDetails'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IStaffInRequestDTO } from '../../../../domain/dtos/Staff/StaffIn'
import { OrderDetailsEntity } from '../../../../domain/entities/OrderDetails'
import { OrderErrorType } from '../../../../domain/enums/order/ErrorType'
import { IOrderDetailsRepository } from '../../../repositories/OrderDetails'
import { ICreateOrderUseCase } from '../CreateOrder'

/**
 * Use case for creating a new order.
 * @class
 * @implements {ICreateOrderUseCase}
 */
export class CreateOrderUseCase implements ICreateOrderUseCase {
  /**
   * Creates an instance of CreateOrderDetailsUseCase.
   * @constructor
   * @param {IOrderDetailsRepository} orderDetailsRepository - The repository for order details data.
   * @param {IStaffRepository} staffRepository - The repository for staffs data.
   */
  constructor(
    private orderDetailsRepository: IOrderDetailsRepository,
    private staffRepository: IStaffRepository
  ) {}

  /**
   * Executes the create order use case.
   * @async
   * @param {number} userId - The ID of the user to create order.
   * @param {ICreateOrderDetailsRequestDTO} data - The creating order request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    userId: number,
    {
      orderExchanges,
      orderSales,
      total,
      goldToCash,
      discount,
      isChecked,
      description,
    }: ICreateOrderDetailsRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const staffExist = (await this.staffRepository.findByUserId(
        userId
      )) as IStaffInRequestDTO | null

      if (!staffExist) {
        return {
          data: { error: OrderErrorType.InvalidOrderDetails },
          success: false,
        }
      }
      const orderDetailsEntity = OrderDetailsEntity.create({
        staff: staffExist,
        orderExchanges,
        orderSales,
        total,
        goldToCash,
        discount,
        isChecked,
        description,
      })

      if (
        orderSales.length == 0 &&
        orderExchanges.length == 0 &&
        (!description || description == '')
      ) {
        return {
          data: { error: OrderErrorType.InvalidOrderDetails },
          success: false,
        }
      }

      const savedOrder = (await this.orderDetailsRepository.create(
        orderDetailsEntity
      )) as OrderDetailsDTO | null

      return { data: savedOrder, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
