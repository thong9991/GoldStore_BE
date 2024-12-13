import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all notification.
 * @interface
 */
export interface IGetAllNotificationUseCase {
  /**
   * Executes the get all notification use case.
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(page: number): Promise<ResponseDTO>
}
