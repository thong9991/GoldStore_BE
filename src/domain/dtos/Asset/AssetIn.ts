import { CashDrawerDTO } from '../CashDrawer/CashDrawer'

/**
 * Data Transfer Object (DTO) representing the input of asset data.
 * @interface
 */
export interface IAssetInRequestDTO {
  /**
   * The ID of the asset.
   */
  id: number

  /**
   * The cash drawer information associated with the asset.
   */
  cashDrawer: CashDrawerDTO

  /**
   * The asset type of the asset.
   */
  assetType: string

  /**
   * The amount of the asset.
   */
  amount: number

  /**
   * The optional created date of the asset.
   */
  createdAt?: Date

  /**
   * The optional updated date of the asset.
   */
  updatedAt?: Date
}
