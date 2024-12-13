/**
 * Data Transfer Object (DTO) representing the request to create a cash drawer.
 * @interface
 */
export interface ICreateCashDrawerRequestDTO {
  /**
   * The name of the cash drawer.
   */
  drawerName: string

  /**
   * The type of the cash drawer.
   */
  drawerType: string
}
