import { IAdminInRequestDTO } from '../../../../domain/dtos/Admin/AdminIn'
import { IAuthenticateUserDTO } from '../../../../domain/dtos/Authenticate/AuthenticateUser'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { AuthenticateUserErrorType } from '../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IGenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IAdminRepository } from '../../../repositories/Admin'
import { IRefreshTokenRepository } from '../../../repositories/RefreshToken'
import { IAuthenticateAdminUseCase } from '../AuthenticateAdmin'

/**
 * Use case for the authenticating a admin user.
 * @class
 * @implements {IAuthenticateAdminUseCase}
 */
export class AuthenticateAdminUseCase implements IAuthenticateAdminUseCase {
  /**
   * Creates an instance of the AuthenticateAdminUseCase.
   * @constructor
   * @param {IAdminRepository} adminRepository - The repository for the admin data.
   * @param {IRefreshTokenRepository} refreshTokenRepository - The repository for the refresh tokens.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   * @param {IGenerateRefreshTokenProvider} refreshTokenGenerator - The refresh token generator provider.
   */
  constructor(
    private adminRepository: IAdminRepository,
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
      const admin = (await this.adminRepository.findByUsername(
        username
      )) as IAdminInRequestDTO | null

      if (!admin) {
        return { data: { error: UserErrorType.UserNotExist }, success: false }
      }

      const matchPassword = await this.passwordHasher.comparePassword(
        password,
        admin.password
      )

      if (!matchPassword) {
        return {
          data: { error: AuthenticateUserErrorType.UsernameOrPasswordWrong },
          success: false,
        }
      }

      const token = await this.refreshTokenGenerator.generateToken(
        admin.id.toString(),
        true
      )

      const refreshTokenFound = await this.refreshTokenRepository.findByUserId(
        -admin.id
      )

      if (refreshTokenFound) {
        await this.refreshTokenRepository.delete(-admin.id)
      }

      const refreshToken = await this.refreshTokenRepository.create(-admin.id)

      return { data: { token, refreshToken, user: admin }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
