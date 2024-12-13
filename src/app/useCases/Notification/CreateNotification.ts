import { ICreateNotificationRequestDTO } from '../../../domain/dtos/Notification/CreateNotification'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new notification.
 * @interface
 */
export interface ICreateNotificationUseCase {
  /**
   * Executes the create notification use case.
   * @async
   * @param {number} userId - the ID of the user.
   * @param {ICreateNotificationRequestDTO} data - The data for creating a new notification.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    userId: number,
    data: ICreateNotificationRequestDTO
  ): Promise<ResponseDTO>
}
