import { ICreateAssetRequestDTO } from '../dtos/Asset/CreateAsset'
import { IUpdateAssetRequestDTO } from '../dtos/Asset/UpdateAsset'
import { ICashDrawerInRequestDTO } from '../dtos/CashDrawer/CashDrawerIn'

/**
 * Interface representing the structure of a asset.
 * @interface
 */
export interface AssetInterface {
  cashDrawer: ICashDrawerInRequestDTO
  assetType: string
  amount: number
}

/**
 * Class representing a asset.
 * @class
 */
export class AssetEntity {
  private _cashDrawer: ICashDrawerInRequestDTO
  private _assetType: string
  private _amount: number

  /**
   * Create an instance of AssetEntity.
   * @constructor
   * @param {AssetInterface} props - The properties of the asset.
   */
  constructor(props: AssetInterface) {
    this._cashDrawer = props.cashDrawer
    this._assetType = props.assetType
    this._amount = props.amount
  }

  /**
   * Create a new asset instance with provided data.
   * @static
   * @param {ICreateAssetRequestDTO} data - The data to create a asset.
   * @returns {AssetEntity} The created asset instance.
   */
  static create({
    cashDrawer,
    assetType,
    amount,
  }: ICreateAssetRequestDTO): AssetEntity {
    return new AssetEntity({
      cashDrawer: cashDrawer,
      assetType: assetType,
      amount: amount,
    })
  }

  /**
   * Update the asset instance with provided data.
   * @static
   * @param {IUpdateAssetRequestDTO} updatedAsset - The data to update a asset.
   * @returns {IUpdateAssetRequestDTO} The updated asset instance.
   */
  static update(updatedAsset: IUpdateAssetRequestDTO): IUpdateAssetRequestDTO {
    return updatedAsset
  }

  /**
   * Gets the cash drawer associated with the asset.
   * @readonly
   */
  get cashDrawer(): ICashDrawerInRequestDTO {
    return this._cashDrawer
  }

  /**
   * Gets the asset asset type.
   * @readonly
   */
  get assetType(): string {
    return this._assetType
  }

  /**
   * Gets the asset amount.
   * @readonly
   */
  get amount(): number {
    return this._amount
  }
}
