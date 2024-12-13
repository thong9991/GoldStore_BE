import { ICreateOrderExchangeRequestDTO } from '../OrderExchange/CreateOrderExchange'
import { ICreateOrderSaleRequestDTO } from '../OrderSale/CreateOrderSale'
import { IStaffInRequestDTO } from '../Staff/StaffIn'

/**
 * Data Transfer Object (DTO) representing the request to create a order.
 * @interface
 */
export interface ICreateOrderDetailsRequestDTO {
  /**
   * The staff information associated with the order.
   */
  staff: IStaffInRequestDTO

  /**
   * The order exchanges information associated with the order.
   */
  orderExchanges: ICreateOrderExchangeRequestDTO[]

  /**
   * The sale order information associated with the order.
   */
  orderSales: ICreateOrderSaleRequestDTO[]

  /**
   * The total amount of the order.
   */
  total: number

  /**
   * The amount of money converted from gold of the order.
   */
  goldToCash: number

  /**
   * The discount amount of the order.
   */
  discount: number

  /**
   * The boolean value indicating whether the order is checked.
   */
  isChecked: boolean

  /**
   * The description of the order.
   */
  description: string
}
