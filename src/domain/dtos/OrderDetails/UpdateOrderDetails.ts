/**
 * Data Transfer Object (DTO) representing the request to update a order.
 * @interface
 */
export interface IUpdateOrderDetailsRequestDTO {
  /**
   * The updated total amount of the order.
   */
  total?: number

  /**
   * The updated amount of money converted from gold of the order.
   */
  goldToCash?: number

  /**
   * The updated discount amount of the order.
   */
  discount?: number

  /**
   * The updated boolean value indicating whether the order is checked.
   */
  isChecked?: boolean

  /**
   * The updated description of the order.
   */
  description?: string
}
