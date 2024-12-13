import { IAuthenticateUserDTO } from '../../../../domain/dtos/Authenticate/AuthenticateUser'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'
import { AuthenticateUserErrorType } from '../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IGenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IRefreshTokenRepository } from '../../../repositories/RefreshToken'
import { IUserRepository } from '../../../repositories/User'
import { IAuthenticateUserUseCase } from '../AuthenticateUser'

/**
 * Use case for the authenticating a user.
 * @class
 * @implements {IAuthenticateUserUseCase}
 */
export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  /**
   * Creates an instance of the AuthenticateUserUseCase.
   * @constructor
   * @param {IUserRepository} userRepository - The repository for the users data.
   * @param {IRefreshTokenRepository} refreshTokenRepository - The repository for the refresh tokens.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   * @param {IGenerateRefreshTokenProvider} refreshTokenGenerator - The refresh token generator provider.
   */
  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
    private passwordHasher: IPasswordHasher,
    private refreshTokenGenerator: IGenerateRefreshTokenProvider
  ) {}

  /**
   * Executes the authenticate user use case.
   * @async
   * @param {IAuthenticateUserDTO} credentials - The user credentials for authentication.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    username,
    password,
  }: IAuthenticateUserDTO): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findByUsername(
        username
      )) as IUserInRequestDTO | null

      if (!user) {
        return { data: { error: UserErrorType.UserNotExist }, success: false }
      }
      if (user.role == 'user') {
        return {
          data: { error: AuthenticateUserErrorType.AccessDenied },
          success: false,
        }
      }

      const matchPassword = await this.passwordHasher.comparePassword(
        password,
        user.password
      )

      if (!matchPassword) {
        return {
          data: { error: AuthenticateUserErrorType.UsernameOrPasswordWrong },
          success: false,
        }
      }

      const token = await this.refreshTokenGenerator.generateToken(
        user.id.toString(),
        false
      )
      const refreshTokenFound = await this.refreshTokenRepository.findByUserId(
        user.id
      )

      if (refreshTokenFound) {
        await this.refreshTokenRepository.delete(user.id)
      }

      const refreshToken = await this.refreshTokenRepository.create(user.id)

      return { data: { token, refreshToken, user }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
