import { INotificationRepository } from '../../../app/repositories/Notification'
import { ICreateNotificationRequestDTO } from '../../../domain/dtos/Notification/CreateNotification'
import { NotificationDTO } from '../../../domain/dtos/Notification/Notification'
import { INotificationOutRequestDTO } from '../../../domain/dtos/Notification/NotificationOut'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the notification repository.
 * @class
 * @implements {INotificationRepository}
 */
export class NotificationRepository implements INotificationRepository {
  /**
   * Creates a new notification.
   * @async
   * @param {ICreateNotificationRequestDTO} data - The notification data.
   * @returns {Promise<INotificationOutRequestDTO>} The created notification.
   */
  async create(
    data: ICreateNotificationRequestDTO
  ): Promise<INotificationOutRequestDTO> {
    const notificationRepository = AppDataSource.getRepository(NotificationDTO)
    const notification = notificationRepository.create(data)
    const results = await notificationRepository.save(notification)
    return results
  }

  /**
   * Retrieves the paginated list of notifications.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of notifications.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 20

    const notificationRepository = AppDataSource.getRepository(NotificationDTO)
    const [notifications, total] = await notificationRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        title: true,
        body: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      body: notifications,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
