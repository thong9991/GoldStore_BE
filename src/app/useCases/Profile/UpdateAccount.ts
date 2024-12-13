import { ResponseDTO } from '../../../domain/dtos/Response'
import { IUpdateAccountRequestDTO } from '../../../domain/dtos/User/UpdateAccount'

/**
 * Interface for the use case of updating user account.
 * @interface
 */
export interface IUpdateAccountUseCase {
  /**
   * Executes the update user account use case.
   * @async
   * @param {number} userId - The ID of the user to be updated.
   * @param {IUpdateAccountRequestDTO} data - The data for updating user account.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: number, data: IUpdateAccountRequestDTO): Promise<ResponseDTO>
}
