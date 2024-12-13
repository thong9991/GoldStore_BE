import { IRefreshTokenDTO } from '../../../../domain/dtos/Authenticate/RefreshToken'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IGenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { ITokenManagerProvider } from '../../../providers/TokenManager'
import { IRefreshTokenRepository } from '../../../repositories/RefreshToken'
import { IRefreshTokenUseCase } from '../RefreshToken'

/**
 * Use case for refreshing user token.
 * @class
 * @implements {IRefreshTokenUserUseCase}
 */
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  /**
   * Create a new instance of RefreshTokenUseCase.
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
   * @param {IRefreshTokenUserDTO} user_id - The ID of the user to refresh token.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(user_id: number): Promise<ResponseDTO> {
    try {
      // Find the user's refresh token and validate it.
      const refreshToken = (await this.refreshTokenRepository.findByUserId(
        user_id
      )) as IRefreshTokenDTO | null

      if (!refreshToken) {
        return { data: { error: 'Refresh token is invalid.' }, success: false }
      }

      // Check if the refresh token has expired.
      const refreshTokenExpired = this.tokenManager.validateTokenExpiration(
        refreshToken.expiresIn
      )

      if (!refreshTokenExpired) {
        return {
          data: { error: 'Your refresh token is still valid.' },
          success: false,
        }
      }

      // If the refresh token is expired, generate a new one and update the database.
      await this.refreshTokenRepository.delete(user_id)

      const token = await this.refreshTokenGenerator.generateToken(
        Math.abs(user_id).toString(),
        user_id < 0
      )
      const newRefreshToken = await this.refreshTokenRepository.create(user_id)
      return {
        data: { refreshToken: newRefreshToken, token },
        success: true,
      }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
