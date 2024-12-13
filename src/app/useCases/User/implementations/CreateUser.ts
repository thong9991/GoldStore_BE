import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ICreateUserRequestDTO } from '../../../../domain/dtos/User/CreateUser'
import { UserDTO } from '../../../../domain/dtos/User/User'
import { UserEntity } from '../../../../domain/entities/User'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IUserRepository } from '../../../repositories/User'
import { ICreateUserUseCase } from '../CreateUser'

/**
 * Use case for creating a new user.
 * @class
 * @implements {ICreateUserUseCase}
 */
export class CreateUserUseCase implements ICreateUserUseCase {
  /**
   * Creates an instance of CreateUserUseCase.
   * @constructor
   * @param {IUserRepository} userRepository - The repository for the users data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  /**
   * Executes the create user use case.
   * @async
   * @param {ICreateUserRequestDTO} data - The creating user request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    role,
    email,
    username,
    password,
  }: ICreateUserRequestDTO): Promise<ResponseDTO> {
    try {
      const userExist = (await this.userRepository.findByUsername(
        username
      )) as UserDTO | null

      if (userExist) {
        return {
          data: { error: UserErrorType.UserAlreadyExists },
          success: false,
        }
      }

      const hashedPassword = await this.passwordHasher.hashPassword(password)

      const userEntity = UserEntity.create({
        role,
        email,
        username,
        password: hashedPassword,
      })
      const user = await this.userRepository.create(userEntity)

      return { data: user, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
