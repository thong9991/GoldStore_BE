/**
 * Data Transfer Object (DTO) representing the request to update a cash drawer.
 * @interface
 */
export interface IUpdateCashDrawerRequestDTO {
  /**
   * The updated ID of the cash drawer.
   */
  id?: number

  /**
   * The updated name of the cash drawer.
   */
  drawerName?: string

  /**
   * The updated type of the cash drawer.
   */
  drawerType?: string
}
