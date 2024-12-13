import { IUserInRequestDTO } from '../User/UserIn'

/**
 * Data Transfer Object (DTO) representing the request to create a notification.
 * @interface
 */
export interface ICreateNotificationRequestDTO {
  /**
   * The title of the notification.
   */
  title: string

  /**
   * The body of the notification.
   */
  body: string

  /**
   * The data of the notification.
   */
  data: { [key: string]: string }

  /**
   * The user information associated with the notification.
   */
  user: IUserInRequestDTO
}
