import { IAssetInRequestDTO } from '../Asset/AssetIn'

/**
 * Data Transfer Object (DTO) representing the request to update a cash flow statement.
 * @interface
 */
export interface IUpdateCashFlowRequestDTO {
  /**
   * The updated ID of the cash flow statement.
   */
  id?: number

  /**
   * The updated asset of the cash flow statement.
   */
  asset?: IAssetInRequestDTO

  /**
   * The updated amount of the cash flow statement.
   */
  amount?: number
}
