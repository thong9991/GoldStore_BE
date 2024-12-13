import { ICreateNotificationRequestDTO } from '../dtos/Notification/CreateNotification'
import { IUserInRequestDTO } from '../dtos/User/UserIn'

/**
 * Interface representing the structure of a notification.
 * @interface
 */
export interface NotificationInterface {
  title: string
  body: string
  data: { [key: string]: string }
  user: IUserInRequestDTO
}

/**
 * Class representing a notification.
 * @class
 */
export class NotificationEntity {
  private _title: string
  private _body: string
  private _data: { [key: string]: string }
  private _user: IUserInRequestDTO

  /**
   * Create an instance of NotificationEntity.
   * @constructor
   * @param {NotificationInterface} props - The properties of the notification.
   */
  constructor(props: NotificationInterface) {
    this._title = props.title
    this._body = props.body
    this._data = props.data
    this._user = props.user
  }

  /**
   * Create a new notification instance with provided data.
   * @static
   * @param {ICreateNotificationRequestDTO} data - The data to create a notification.
   * @returns {NotificationEntity} The created notification instance.
   */
  static create({
    title,
    body,
    data,
    user,
  }: ICreateNotificationRequestDTO): NotificationEntity {
    return new NotificationEntity({
      title: title,
      body: body,
      data: data,
      user: user,
    })
  }

  /**
   * Gets the notification's name.
   * @readonly
   */
  get title(): string {
    return this._title
  }

  /**
   * Gets the notification's code.
   * @readonly
   */
  get body(): string {
    return this._body
  }

  /**
   * Gets the notification's address.
   * @readonly
   */
  get data(): { [key: string]: string } {
    return this._data
  }

  /**
   * Gets the user associated with the notification.
   * @readonly
   */
  get user(): IUserInRequestDTO {
    return this._user
  }
}
