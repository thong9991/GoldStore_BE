import { ResponseDTO } from '../../../domain/dtos/Response'
import { IUpdateAccountRequestDTO } from '../../../domain/dtos/User/UpdateAccount'

/**
 * Interface for the use case of updating user password.
 * @interface
 */
export interface IChangePasswordUseCase {
  /**
   * Executes the update user password use case.
   * @async
   * @param {number} userId - The ID of the user to be updated.
   * @param {IUpdateAccountRequestDTO} data - The data for updating user password.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: number, data: IUpdateAccountRequestDTO): Promise<ResponseDTO>
}
