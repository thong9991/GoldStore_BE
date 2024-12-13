import { ProductDTO } from '../Product/Product'

/**
 * Data Transfer Object (DTO) representing the request to create a sale order.
 * @interface
 */
export interface ICreateOrderSaleRequestDTO {
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
