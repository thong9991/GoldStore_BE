import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating user fcm token information.
 * @interface
 */
export interface IBindTokenUseCase {
  /**
   * Executes the update user fcm token use case.
   * @async
   * @param {number} userId - The ID of the user to be updated.
   * @param {string} fcmToken - The fcm token for updating user information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: number, fcmToken: string): Promise<ResponseDTO>
}
