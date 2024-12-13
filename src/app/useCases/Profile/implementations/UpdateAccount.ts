import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUpdateAccountRequestDTO } from '../../../../domain/dtos/User/UpdateAccount'
import { UserDTO } from '../../../../domain/dtos/User/User'
import { UserEntity } from '../../../../domain/entities/User'
import { AuthenticateUserErrorType } from '../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IUserRepository } from '../../../repositories/User'
import { IUpdateAccountUseCase } from '../UpdateAccount'

/**
 * Use case for updating user account.
 * @class
 * @implements {IUpdateAccountUseCase}
 */
export class UpdateAccountUseCase implements IUpdateAccountUseCase {
  /**
   * Creates an instance of UpdateAccountUseCase.
   * @constructor
   * @param {IUserRepository} userRepository - The repository for the users data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  /**
   * Executes the update user account use case.
   * @async
   * @param {number} userId - The ID of the user to be updated.
   * @param {IUpdateAccountRequestDTO} requestData - The account change request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    userId: number,
    { oldPassword, email, username }: IUpdateAccountRequestDTO
  ): Promise<ResponseDTO> {
    try {
      if (username) {
        const userWithUsername = (await this.userRepository.findByUsername(
          username
        )) as UserDTO | null

        if (userWithUsername && userWithUsername.id != userId) {
          return {
            data: { error: UserErrorType.UserAlreadyExists },
            success: false,
          }
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
        username,
        email,
      })

      const user = await this.userRepository.update(userExist, userEntity)

      return { data: user, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
