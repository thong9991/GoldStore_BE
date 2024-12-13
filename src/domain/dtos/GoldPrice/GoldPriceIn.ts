/**
 * Data Transfer Object (DTO) representing the input of gold price data.
 * @interface
 */
export interface IGoldPriceInRequestDTO {
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

  /**
   * The optional created date of the gold price.
   */
  createdAt?: Date

  /**
   * The optional updated date of the gold price.
   */
  updatedAt?: Date
}
