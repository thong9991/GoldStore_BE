import { IGoldPriceInRequestDTO } from '../dtos/GoldPrice/GoldPriceIn'
import { IOrderDetailsInRequestDTO } from '../dtos/OrderDetails/OrderDetailsIn'
import { ICreateOrderExchangeRequestDTO } from '../dtos/OrderExchange/CreateOrderExchange'
import { IUpdateOrderExchangeRequestDTO } from '../dtos/OrderExchange/UpdateOrderExchange'

/**
 * Interface representing the structure of a order exchange.
 * @interface
 */
export interface OrderExchangeInterface {
  orderDetails: IOrderDetailsInRequestDTO
  goldPrice: IGoldPriceInRequestDTO
  amount: number
}

/**
 * Class representing a order exchange.
 * @class
 */
export class OrderExchangeEntity {
  private _orderDetails: IOrderDetailsInRequestDTO
  private _goldPrice: IGoldPriceInRequestDTO
  private _amount: number

  /**
   * Create an instance of OrderExchangeEntity.
   * @constructor
   * @param {OrderExchangeInterface} props - The properties of the order exchange.
   */
  constructor(props: OrderExchangeInterface) {
    this._orderDetails = props.orderDetails
    this._goldPrice = props.goldPrice
    this._amount = props.amount
  }

  /**
   * Create a new order exchange instance with provided data.
   * @static
   * @param {ICreateOrderExchangeRequestDTO} data - The data to create a order exchange.
   * @returns {OrderExchangeEntity} The created order exchange instance.
   */
  static create({
    orderDetails,
    goldPrice,
    amount,
  }: ICreateOrderExchangeRequestDTO): OrderExchangeEntity {
    return new OrderExchangeEntity({
      orderDetails: orderDetails,
      goldPrice: goldPrice,
      amount: amount,
    })
  }

  /**
   * Update the order exchange instance with provided data.
   * @static
   * @param {IUpdateOrderExchangeRequestDTO} updatedOrderExchange - The data to update a order exchange.
   * @returns {IUpdateOrderExchangeRequestDTO} The updated order exchange instance.
   */
  static update(
    updatedOrderExchange: IUpdateOrderExchangeRequestDTO
  ): IUpdateOrderExchangeRequestDTO {
    return updatedOrderExchange
  }

  /**
   * Gets the order information associated with the order exchange.
   * @readonly
   */
  get orderDetails(): IOrderDetailsInRequestDTO {
    return this._orderDetails
  }

  /**
   * Gets the gold price information associated with the order exchange.
   * @readonly
   */
  get goldPrice(): IGoldPriceInRequestDTO {
    return this._goldPrice
  }

  /**
   * Gets the order exchange's gold amount.
   * @readonly
   */
  get amount(): number {
    return this._amount
  }
}
