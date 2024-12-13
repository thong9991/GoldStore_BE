import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUpdateUserRequestDTO } from '../../../../domain/dtos/User/UpdateUser'
import { UserDTO } from '../../../../domain/dtos/User/User'
import { UserEntity } from '../../../../domain/entities/User'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IUserRepository } from '../../../repositories/User'
import { IUpdateUserUseCase } from '../UpdateUser'

/**
 * Use case for updating user information.
 * @class
 * @implements {IUpdateUserUseCase}
 */
export class UpdateUserUseCase implements IUpdateUserUseCase {
  /**
   * Creates an instance of UpdateUserUseCase.
   * @constructor
   * @param {IUserRepository} userRepository - The repository for the users data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  /**
   * Executes the update user use case.
   * @async
   * @param {number} userId - The ID of the user to be updated.
   * @param {IUpdateUserRequestDTO} requestData - The updated user information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    userId: number,
    { staff, role, password }: IUpdateUserRequestDTO
  ): Promise<ResponseDTO> {
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

      if (password) {
        password = await this.passwordHasher.hashPassword(password)
      }

      const userEntity = UserEntity.update({
        staff,
        role,
        password,
      })

      const user = await this.userRepository.update(userExist, userEntity)

      return { data: user, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
