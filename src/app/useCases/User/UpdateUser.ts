import { ResponseDTO } from '../../../domain/dtos/Response'
import { IUpdateUserRequestDTO } from '../../../domain/dtos/User/UpdateUser'

/**
 * Interface for the use case of updating user information.
 * @interface
 */
export interface IUpdateUserUseCase {
  /**
   * Executes the update user use case.
   * @async
   * @param {number} userId - The ID of the user to be updated.
   * @param {IUpdateUserRequestDTO} data - The data for updating user information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: number, data: IUpdateUserRequestDTO): Promise<ResponseDTO>
}
