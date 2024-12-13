import { ResponseDTO } from '../../../../domain/dtos/Response'
import { UserDTO } from '../../../../domain/dtos/User/User'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { UserSuccessType } from '../../../../domain/enums/user/SuccessType'
import { IUserRepository } from '../../../repositories/User'
import { IDeleteUserUseCase } from '../DeleteUser'

/**
 * Use case for deleting user.
 * @class
 * @implements {IDeleteUserUseCase}
 */
export class DeleteUserUseCase implements IDeleteUserUseCase {
  /**
   * Creating an instance of DeleteUserUseCase.
   * @constructor
   * @param {IUserRepository} userRepository - The repository for the users data.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executes the delete user use case.
   * @async
   * @param {number} userId - The ID of the user to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(userId: number): Promise<ResponseDTO> {
    try {
      const userExist = (await this.userRepository.findById(
        userId
      )) as UserDTO | null

      if (!userExist) {
        return {
          data: { error: UserErrorType.UserNotExist },
          success: false,
        }
      }
      await this.userRepository.delete(userId)

      return { data: { msg: UserSuccessType.UserDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
