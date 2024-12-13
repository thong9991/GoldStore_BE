import { OrderDetailsDTO } from '../OrderDetails/OrderDetails'
import { ProductDTO } from '../Product/Product'

/**
 * Data Transfer Object (DTO) representing the output of sale order data.
 * @interface
 */
export interface IOrderSaleOutRequestDTO {
  /**
   * The ID of the sale order.
   */
  id: number

  /**
   * The order details information associated with the sale order.
   */
  orderDetails: OrderDetailsDTO

  /**
   * The product information associated with the sale order.
   */
  product: ProductDTO

  /**
   * The amount of cut gold of the sale order.
   */
  cutAmount: number

  /**
   * The total wage of the sale order.
   */
  newWage: number
}
