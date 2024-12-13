import { ICreateCashDrawerRequestDTO } from '../dtos/CashDrawer/CreateCashDrawer'
import { IUpdateCashDrawerRequestDTO } from '../dtos/CashDrawer/UpdateCashDrawer'

/**
 * Interface representing the structure of a drawer.
 * @interface
 */
export interface CashDrawerInterface {
  drawerName: string
  drawerType: string
}

/**
 * Class representing a drawer.
 * @class
 */
export class CashDrawerEntity {
  private _drawerName: string
  private _drawerType: string

  /**
   * Create an instance of CashDrawerEntity.
   * @constructor
   * @param {CashDrawerInterface} props - The properties of the drawer.
   */
  constructor(props: CashDrawerInterface) {
    this._drawerName = props.drawerName
    this._drawerType = props.drawerType
  }

  /**
   * Create a new drawer instance with provided data.
   * @static
   * @param {ICreateCashDrawerRequestDTO} data - The data to create a drawer.
   * @returns {CashDrawerEntity} The created drawer instance.
   */
  static create({
    drawerName,
    drawerType,
  }: ICreateCashDrawerRequestDTO): CashDrawerEntity {
    return new CashDrawerEntity({
      drawerName: drawerName,
      drawerType: drawerType,
    })
  }

  /**
   * Update the drawer instance with provided data.
   * @static
   * @param {IUpdateCashDrawerRequestDTO} updatedCashDrawer - The data to update a drawer.
   * @returns {IUpdateCashDrawerRequestDTO} The updated drawer instance.
   */
  static update(
    updatedCashDrawer: IUpdateCashDrawerRequestDTO
  ): IUpdateCashDrawerRequestDTO {
    return updatedCashDrawer
  }

  /**
   * Gets the drawer's name.
   * @readonly
   */
  get drawerName(): string {
    return this._drawerName
  }

  /**
   * Gets the drawer's type.
   * @readonly
   */
  get drawerType(): string {
    return this._drawerType
  }
}
