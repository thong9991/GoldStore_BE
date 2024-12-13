import { StaffDTO } from '../Staff/Staff'

/**
 * Data Transfer Object (DTO) representing the input of order data.
 * @interface
 */
export interface IOrderDetailsInRequestDTO {
  /**
   * The ID of the order.
   */
  id: string

  /**
   * The staff information associated with the order.
   */
  staff: StaffDTO

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

  /**
   * The optional created date of the order.
   */
  createdAt?: Date

  /**
   * The optional updated date of the order.
   */
  updatedAt?: Date
}
