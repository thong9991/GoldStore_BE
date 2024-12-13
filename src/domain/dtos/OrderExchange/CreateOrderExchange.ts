import { IGoldPriceInRequestDTO } from '../GoldPrice/GoldPriceIn'

/**
 * Data Transfer Object (DTO) representing the request to create a order exchange.
 * @interface
 */
export interface ICreateOrderExchangeRequestDTO {
  /**
   * The gold price information associated with the order exchange.
   */
  goldPrice: IGoldPriceInRequestDTO

  /**
   * The amount of gold of the order exchange.
   */
  amount: number
}
