import { ICreateNotificationRequestDTO } from '../../domain/dtos/Notification/CreateNotification'
import { INotificationOutRequestDTO } from '../../domain/dtos/Notification/NotificationOut'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the notification data.
 * @interface
 */
export interface INotificationRepository {
  /**
   * Creates a new notification with the provided data.
   * @async
   * @param {ICreateNotificationRequestDTO} data - The notification data to be created.
   * @returns {Promise<INotificationOutRequestDTO>} The created notification data.
   */
  create(
    data: ICreateNotificationRequestDTO
  ): Promise<INotificationOutRequestDTO>

  /**
   * Retrieves the paginated list of notifications.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated notification list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
