/**
 * Data Transfer Object (DTO) representing the output of notification data.
 * @interface
 */
export interface INotificationOutRequestDTO {
  /**
   * The ID of the notification.
   */
  id: number

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
   * The optional created date of the notification.
   */
  createdAt?: Date

  /**
   * The optional updated date of the notification.
   */
  updatedAt?: Date
}
