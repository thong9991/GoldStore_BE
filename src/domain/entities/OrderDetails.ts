import { ICreateOrderDetailsRequestDTO } from '../dtos/OrderDetails/CreateOrderDetails'
import { IUpdateOrderDetailsRequestDTO } from '../dtos/OrderDetails/UpdateOrderDetails'
import { ICreateOrderExchangeRequestDTO } from '../dtos/OrderExchange/CreateOrderExchange'
import { ICreateOrderSaleRequestDTO } from '../dtos/OrderSale/CreateOrderSale'
import { IStaffInRequestDTO } from '../dtos/Staff/StaffIn'

/**
 * Interface representing the structure of a order details.
 * @interface
 */
export interface OrderDetailsInterface {
  staff: IStaffInRequestDTO
  orderExchanges?: ICreateOrderExchangeRequestDTO[]
  orderSales?: ICreateOrderSaleRequestDTO[]
  total: number
  goldToCash: number
  discount: number
  isChecked: boolean
  description: string
}

/**
 * Class representing a order details.
 * @class
 */
export class OrderDetailsEntity {
  private _staff: IStaffInRequestDTO
  private _orderExchanges: ICreateOrderExchangeRequestDTO[]
  private _orderSales: ICreateOrderSaleRequestDTO[]
  private _total: number
  private _goldToCash: number
  private _discount: number
  private _isChecked: boolean
  private _description: string

  /**
   * Create an instance of OrderDetailsEntity.
   * @constructor
   * @param {OrderDetailsInterface} props - The properties of the order details.
   */
  constructor(props: OrderDetailsInterface) {
    this._staff = props.staff
    this._orderExchanges = props.orderExchanges || []
    this._orderSales = props.orderSales || []
    this._total = props.total
    this._goldToCash = props.goldToCash
    this._discount = props.discount
    this._isChecked = props.isChecked
    this._description = props.description
  }

  /**
   * Create a new order details instance with provided data.
   * @static
   * @param {ICreateOrderDetailsRequestDTO} data - The data to create a order details.
   * @returns {OrderDetailsEntity} The created order details instance.
   */
  static create({
    staff,
    orderExchanges,
    orderSales,
    total,
    goldToCash,
    discount,
    isChecked,
    description,
  }: ICreateOrderDetailsRequestDTO): OrderDetailsEntity {
    return new OrderDetailsEntity({
      staff: staff,
      total: total,
      orderExchanges: orderExchanges,
      orderSales: orderSales,
      goldToCash: goldToCash,
      discount: discount,
      isChecked: isChecked,
      description: description,
    })
  }

  /**
   * Update the order details instance with provided data.
   * @static
   * @param {IUpdateOrderDetailsRequestDTO} updatedOrderDetails - The data to update a order details.
   * @returns {IUpdateOrderDetailsRequestDTO} The updated order details instance.
   */
  static update(
    updatedOrderDetails: IUpdateOrderDetailsRequestDTO
  ): IUpdateOrderDetailsRequestDTO {
    return updatedOrderDetails
  }

  /**
   * Gets the staff information associated with the order details.
   * @readonly
   */
  get staff(): IStaffInRequestDTO {
    return this._staff
  }

  /**
   * Gets the order exchanges information associated with the order details.
   * @readonly
   */
  get orderExchanges(): ICreateOrderExchangeRequestDTO[] {
    return this._orderExchanges
  }

  /**
   * Gets the sales order information associated with the order details.
   * @readonly
   */
  get orderSales(): ICreateOrderSaleRequestDTO[] {
    return this._orderSales
  }

  /**
   * Gets the order details' total.
   * @readonly
   */
  get total(): number {
    return this._total
  }

  /**
   * Gets the order details' money converted from gold.
   * @readonly
   */
  get goldToCash(): number {
    return this._goldToCash
  }

  /**
   * Gets the order details' discount.
   * @readonly
   */
  get discount(): number {
    return this._discount
  }

  /**
   * Gets the order details' checked status.
   * @readonly
   */
  get isChecked(): boolean {
    return this._isChecked
  }

  /**
   * Gets the order details' description.
   * @readonly
   */
  get description(): string {
    return this._description
  }
}
