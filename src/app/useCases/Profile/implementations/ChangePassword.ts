import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUpdateAccountRequestDTO } from '../../../../domain/dtos/User/UpdateAccount'
import { UserDTO } from '../../../../domain/dtos/User/User'
import { UserEntity } from '../../../../domain/entities/User'
import { AuthenticateUserErrorType } from '../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IUserRepository } from '../../../repositories/User'
import { IChangePasswordUseCase } from '../ChangePassword'

/**
 * Use case for updating user password.
 * @class
 * @implements {IChangePasswordUseCase}
 */
export class ChangePasswordUseCase implements IChangePasswordUseCase {
  /**
   * Creates an instance of ChangePasswordUseCase.
   * @constructor
   * @param {IUserRepository} userRepository - The repository for the users data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  /**
   * Executes the update user password use case.
   * @async
   * @param {number} userId - The ID of the user to be updated.
   * @param {IUpdateAccountRequestDTO} requestData - The password change request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    userId: number,
    { oldPassword, newPassword }: IUpdateAccountRequestDTO
  ): Promise<ResponseDTO> {
    try {
      if (!newPassword || newPassword.length < 8) {
        return {
          data: { error: UserErrorType.PasswordLengthTooShort },
          success: false,
        }
      }

      const userExist = (await this.userRepository.findById(
        userId
      )) as UserDTO | null

      if (!userExist) {
        return {
          data: { error: UserErrorType.UserNotExist },
          success: false,
        }
      }

      const password = await this.passwordHasher.hashPassword(newPassword)

      const matchPassword = await this.passwordHasher.comparePassword(
        oldPassword,
        userExist.password
      )
      if (!matchPassword) {
        return {
          data: { error: AuthenticateUserErrorType.PasswordWrong },
          success: false,
        }
      }

      const userEntity = UserEntity.update({
        password,
      })

      const user = await this.userRepository.update(userExist, userEntity)

      return { data: user, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
