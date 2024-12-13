import { ICreateGoldPriceRequestDTO } from '../dtos/GoldPrice/CreateGoldPrice'
import { IUpdateGoldPriceRequestDTO } from '../dtos/GoldPrice/UpdateGoldPrice'

/**
 * Interface representing the structure of a gold price.
 * @interface
 */
export interface GoldPriceInterface {
  goldType: string
  askPrice: number
  bidPrice: number
}

/**
 * Class representing a gold price.
 * @class
 */
export class GoldPriceEntity {
  private _goldType: string
  private _askPrice: number
  private _bidPrice: number

  /**
   * Create an instance of GoldPriceEntity.
   * @constructor
   * @param {GoldPriceInterface} props - The properties of the gold price.
   */
  constructor(props: GoldPriceInterface) {
    this._goldType = props.goldType
    this._askPrice = props.askPrice
    this._bidPrice = props.bidPrice
  }

  /**
   * Create a new gold price instance with provided data.
   * @static
   * @param {ICreateGoldPriceRequestDTO} data - The data to create a gold price.
   * @returns {GoldPriceEntity} The created gold price instance.
   */
  static create({
    goldType,
    askPrice,
    bidPrice,
  }: ICreateGoldPriceRequestDTO): GoldPriceEntity {
    return new GoldPriceEntity({
      goldType: goldType,
      askPrice: askPrice,
      bidPrice: bidPrice,
    })
  }

  /**
   * Update the gold price instance with provided data.
   * @static
   * @param {IUpdateGoldPriceRequestDTO} updatedGoldPrice - The data to update a gold price.
   * @returns {IUpdateGoldPriceRequestDTO} The updated gold price instance.
   */
  static update(
    updatedGoldPrice: IUpdateGoldPriceRequestDTO
  ): IUpdateGoldPriceRequestDTO {
    return updatedGoldPrice
  }

  /**
   * Gets the gold price's type.
   * @readonly
   */
  get goldType(): string {
    return this._goldType
  }

  /**
   * Gets the gold price's ask price.
   * @readonly
   */
  get askPrice(): number {
    return this._askPrice
  }

  /**
   * Gets the gold price's bid price.
   * @readonly
   */
  get bidPrice(): number {
    return this._bidPrice
  }
}
