import { ICashDrawerInRequestDTO } from '../CashDrawer/CashDrawerIn'

/**
 * Data Transfer Object (DTO) representing the request to update a asset.
 * @interface
 */
export interface IUpdateAssetRequestDTO {
  /**
   * The updated ID of the asset.
   */
  id?: number

  /**
   * The updated cash drawer information associated with the asset.
   */
  cashDrawer?: ICashDrawerInRequestDTO

  /**
   * The updated asset type of the asset.
   */
  assetType?: string

  /**
   * The updated amount of the asset.
   */
  amount?: number
}
