/**
 * Data Transfer Object (DTO) representing the request to update a gold price.
 * @interface
 */
export interface IUpdateGoldPriceRequestDTO {
  /**
   * The updated gold type of the gold price.
   */
  goldType?: string

  /**
   * The updated ask price of the gold price.
   */
  askPrice?: number

  /**
   * The updated bid price of the gold price.
   */
  bidPrice?: number
}
