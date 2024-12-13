import { ICashDrawerInRequestDTO } from '../CashDrawer/CashDrawerIn'

/**
 * Data Transfer Object (DTO) representing the request to create a asset.
 * @interface
 */
export interface ICreateAssetRequestDTO {
  /**
   * The cash drawer information associated with the asset.
   */
  cashDrawer: ICashDrawerInRequestDTO

  /**
   * The asset type of the asset.
   */
  assetType: string

  /**
   * The amount of the asset.
   */
  amount: number
}
