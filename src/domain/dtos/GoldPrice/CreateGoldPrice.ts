/**
 * Data Transfer Object (DTO) representing the request to create a gold price.
 * @interface
 */
export interface ICreateGoldPriceRequestDTO {
  /**
   * The type of the gold price.
   */
  goldType: string

  /**
   * The ask price of the gold price.
   */
  askPrice: number

  /**
   * The bid price of the gold price.
   */
  bidPrice: number
}
