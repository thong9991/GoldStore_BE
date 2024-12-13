import { IGoldPriceInRequestDTO } from '../GoldPrice/GoldPriceIn'
import { IOrderDetailsInRequestDTO } from '../OrderDetails/OrderDetailsIn'

/**
 * Data Transfer Object (DTO) representing the request to update a order exchange.
 * @interface
 */
export interface IUpdateOrderExchangeRequestDTO {
  /**
   * The updated ID of the order exchange.
   */
  id?: number

  /**
   * The updated order details information associated with the order exchange.
   */
  orderDetails?: IOrderDetailsInRequestDTO

  /**
   * The updated gold price information associated with the order exchange.
   */
  goldPrice?: IGoldPriceInRequestDTO

  /**
   * The updated amount of gold of the order exchange.
   */
  amount?: number
}
