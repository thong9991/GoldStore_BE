import { IAdminInRequestDTO } from '../../../../domain/dtos/Admin/AdminIn'
import { IRecoverUserInformationDTO } from '../../../../domain/dtos/Authenticate/RecoverUserInformation'
import { IRefreshTokenDTO } from '../../../../domain/dtos/Authenticate/RefreshToken'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'
import { ITokenManagerProvider } from '../../../providers/TokenManager'
import { IAdminRepository } from '../../../repositories/Admin'
import { IRefreshTokenRepository } from '../../../repositories/RefreshToken'
import { IUserRepository } from '../../../repositories/User'
import { IRecoverUserInformationUseCase } from '../RecoverUserInformation'

/**
 * Use case for recovering user information.
 * @class
 * @implements {IRecoverUserInformationUseCase}
 */
export class RecoverUserInformationUseCase
  implements IRecoverUserInformationUseCase
{
  /**
   * Creates an instance of RecoverUserInformationUseCase.
   * @constructor
   * @param {IUserRepository} userRepository - The repository for the users data.
   * @param {IAdminRepository} adminRepository - The repository for the admin data.
   * @param {IRefreshTokenRepository} refreshTokenRepository - The repository for the refresh tokens.
   * @param {ITokenManagerProvider} tokenManager - The token manager provider.
   */
  constructor(
    private userRepository: IUserRepository,
    private adminRepository: IAdminRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
    private tokenManager: ITokenManagerProvider
  ) {}

  /**
   * Executes the recover user information use case.
   * @async
   * @param {IRecoverUserInformationDTO} refreshTokenId - The identifier of the refresh token.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    user_id,
    refreshTokenId,
  }: IRecoverUserInformationDTO): Promise<ResponseDTO> {
    try {
      // Validate the refresh token and retrieve the user information.
      const refreshToken = (await this.refreshTokenRepository.findById(
        refreshTokenId
      )) as IRefreshTokenDTO | null

      if (!refreshToken || refreshToken.user_id != user_id) {
        return {
          data: { error: 'This refresh token is invalid.' },
          success: false,
        }
      }

      var user
      if (user_id > 0) {
        user = (await this.userRepository.findById(
          user_id
        )) as IUserInRequestDTO | null
      } else {
        user = (await this.adminRepository.findById(
          Math.abs(user_id)
        )) as IAdminInRequestDTO | null
      }

      // Validate the refresh token expiration.
      const refreshTokenExpired = this.tokenManager.validateTokenExpiration(
        refreshToken.expiresIn
      )

      // If the refresh token is expired, delete it and generate a new one.
      if (refreshTokenExpired) {
        await this.refreshTokenRepository.delete(user_id)
        const newRefreshToken =
          await this.refreshTokenRepository.create(user_id)

        return {
          data: { refreshToken: newRefreshToken, user },
          success: true,
        }
      }

      // If the refresh token is not expired, return the user information.
      return { data: user, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
