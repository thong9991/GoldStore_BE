import { IAssetInRequestDTO } from '../dtos/Asset/AssetIn'
import { ICreateCashFlowRequestDTO } from '../dtos/CashFlow/CreateCashFlow'
import { IUpdateCashFlowRequestDTO } from '../dtos/CashFlow/UpdateCashFlow'

/**
 * Interface representing the structure of a cash flow statement.
 * @interface
 */
export interface CashFlowInterface {
  asset: IAssetInRequestDTO
  amount: number
}

/**
 * Class representing a cash flow statement.
 * @class
 */
export class CashFlowEntity {
  private _asset: IAssetInRequestDTO
  private _amount: number

  /**
   * Create an instance of CashFlowEntity.
   * @constructor
   * @param {CashFlowInterface} props - The properties of the cash flow statement.
   */
  constructor(props: CashFlowInterface) {
    this._asset = props.asset
    this._amount = props.amount
  }

  /**
   * Create a new cash flow statement instance with provided data.
   * @static
   * @param {ICreateCashFlowRequestDTO} data - The data to create a cash flow statement.
   * @returns {CashFlowEntity} The created cash flow statement instance.
   */
  static create({ asset, amount }: ICreateCashFlowRequestDTO): CashFlowEntity {
    return new CashFlowEntity({
      asset: asset,
      amount: amount,
    })
  }

  /**
   * Update the cash flow statement instance with provided data.
   * @static
   * @param {IUpdateCashFlowRequestDTO} updatedCashFlow - The data to update a cash flow statement.
   * @returns {IUpdateCashFlowRequestDTO} The updated cash flow statement instance.
   */
  static update(
    updatedCashFlow: IUpdateCashFlowRequestDTO
  ): IUpdateCashFlowRequestDTO {
    return updatedCashFlow
  }

  /**
   * Gets the cash flow statement asset type.
   * @readonly
   */
  get asset(): IAssetInRequestDTO {
    return this._asset
  }

  /**
   * Gets the cash flow statement amount.
   * @readonly
   */
  get amount(): number {
    return this._amount
  }
}
