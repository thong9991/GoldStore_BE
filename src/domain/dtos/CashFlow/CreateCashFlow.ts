import { IAssetInRequestDTO } from '../Asset/AssetIn'

/**
 * Data Transfer Object (DTO) representing the request to create a cash flow statement.
 * @interface
 */
export interface ICreateCashFlowRequestDTO {
  /**
   * The asset of the cash flow statement.
   */
  asset: IAssetInRequestDTO

  /**
   * The amount of the cash flow statement.
   */
  amount: number
}
