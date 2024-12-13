import { AssetDTO } from '../Asset/Asset'

/**
 * Data Transfer Object (DTO) representing the input of cash flow statement data.
 * @interface
 */
export interface ICashFlowInRequestDTO {
  /**
   * The ID of the cash flow statement.
   */
  id: number

  /**
   * The asset of the cash flow statement.
   */
  asset: AssetDTO

  /**
   * The amount of the cash flow statement.
   */
  amount: number

  /**
   * The optional created date of the cash flow statement.
   */
  createdAt?: Date
}
