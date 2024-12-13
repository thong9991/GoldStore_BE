import { IRefreshTokenDTO } from '../../../../domain/dtos/Authenticate/RefreshToken'
import { IRefreshTokenUserDTO } from '../../../../domain/dtos/Authenticate/RefreshTokenUser'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { AuthMessages } from '../../../../domain/enums/Authenticate/AuthMessages'
import { IGenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { ITokenManagerProvider } from '../../../providers/TokenManager'
import { IRefreshTokenRepository } from '../../../repositories/RefreshToken'
import { IRefreshTokenUserUseCase } from '../RefreshTokenUser'

/**
 * Use case for refreshing user token.
 * @class
 * @implements {IRefreshTokenUserUseCase}
 */
export class RefreshTokenUserUseCase implements IRefreshTokenUserUseCase {
  /**
   * Create a new instance of RefreshTokenUserUseCase.
   * @constructor
   * @param {IRefreshTokenRepository} refreshTokenRepository - The repository for the refresh token.
   * @param {IGenerateRefreshTokenProvider} refreshTokenGenerator - The refresh token generator provider.
   * @param {ITokenManagerProvider} tokenManager - The token manager provider.
   */
  constructor(
    private refreshTokenRepository: IRefreshTokenRepository,
    private refreshTokenGenerator: IGenerateRefreshTokenProvider,
    private tokenManager: ITokenManagerProvider
  ) {}

  /**
   * Executes the refreshing user token use case.
   * @async
   * @param {IRefreshTokenUserDTO} refreshTokenId - The identifier of the refresh token.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    refreshTokenId,
  }: IRefreshTokenUserDTO): Promise<ResponseDTO> {
    try {
      // Find the refresh token by its identifier.
      const refreshToken = (await this.refreshTokenRepository.findById(
        refreshTokenId
      )) as IRefreshTokenDTO | null

      if (!refreshToken) {
        return { data: { error: 'Refresh token is invalid.' }, success: false }
      }

      // Check if the refresh token has expired.
      const refreshTokenExpired = this.tokenManager.validateTokenExpiration(
        refreshToken.expiresIn
      )

      if (refreshTokenExpired) {
        return {
          data: { error: AuthMessages.TokenInvalidOrExpired },
          success: false,
        }
      }

      const token = await this.refreshTokenGenerator.generateToken(
        Math.abs(refreshToken.user_id).toString(),
        refreshToken.user_id < 0
      )

      return { data: { token }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
