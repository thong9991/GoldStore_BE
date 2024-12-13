import { IGenerateRefreshTokenProvider } from '../../../../app/providers/GenerateRefreshToken'
import { ITokenManagerProvider } from '../../../../app/providers/TokenManager'
import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken'
import { RefreshTokenUseCase } from '../../../../app/useCases/Authenticate/implementations/RefreshToken'
import { IRefreshTokenUseCase } from '../../../../app/useCases/Authenticate/RefreshToken'
import { RefreshTokenController } from '../../../../presentation/http/controllers/Authenticate/implementations/RefreshToken'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GenerateRefreshToken } from '../../../providers/GenerateRefreshToken'
import { TokenManager } from '../../../providers/TokenManager'
import { RefreshTokenRepository } from '../../../repositories/typeorm/RefreshToken'

/**
 * Composer function for creating and configuring the components required for refreshing token.
 * @function
 * @returns {IController} The configured token refresh controller.
 */
export function refreshTokenComposer(): IController {
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository()
  const refreshTokenGenerator: IGenerateRefreshTokenProvider =
    new GenerateRefreshToken()
  const tokenManager: ITokenManagerProvider = new TokenManager()
  const useCase: IRefreshTokenUseCase = new RefreshTokenUseCase(
    refreshTokenRepository,
    refreshTokenGenerator,
    tokenManager
  )
  const controller: IController = new RefreshTokenController(useCase)
  return controller
}
