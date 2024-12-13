import { GoldPriceDTO } from '../GoldPrice/GoldPrice'
import { OrderDetailsDTO } from '../OrderDetails/OrderDetails'

/**
 * Data Transfer Object (DTO) representing the output of order exchange data.
 * @interface
 */
export interface IOrderExchangeOutRequestDTO {
  /**
   * The ID of the order exchange.
   */
  id: number

  /**
   * The order details information associated with the order exchange.
   */
  orderDetails: OrderDetailsDTO

  /**
   * The gold price information associated with the order exchange.
   */
  goldPrice: GoldPriceDTO

  /**
   * The amount of gold of the order exchange.
   */
  amount: number
}
