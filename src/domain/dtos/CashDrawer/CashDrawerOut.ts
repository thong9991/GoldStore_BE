/**
 * Data Transfer Object (DTO) representing the output of cash drawer data.
 * @interface
 */
export interface ICashDrawerOutRequestDTO {
  /**
   * The ID of the cash drawer.
   */
  id: number

  /**
   * The name of the cash drawer.
   */
  drawerName: string

  /**
   * The type of the cash drawer.
   */
  drawerType: string

  /**
   * The optional created date of the cash drawer.
   */
  createdAt?: Date

  /**
   * The optional updated date of the cash drawer .
   */
  updatedAt?: Date
}
