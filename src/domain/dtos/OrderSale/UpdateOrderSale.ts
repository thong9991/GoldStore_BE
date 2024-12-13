import { OrderDetailsDTO } from '../OrderDetails/OrderDetails'
import { ProductDTO } from '../Product/Product'

/**
 * Data Transfer Object (DTO) representing the request to update a sale order.
 * @interface
 */
export interface IUpdateOrderSaleRequestDTO {
  /**
   * The updated ID of the sale order.
   */
  id?: number

  /**
   * The updated order details information associated with the sale order.
   */
  orderDetails?: OrderDetailsDTO

  /**
   * The updated product information associated with the sale order.
   */
  product?: ProductDTO

  /**
   * The updated amount of cut gold of the sale order.
   */
  cutAmount?: number

  /**
   * The updated total wage of the sale order.
   */
  newWage?: number
}
