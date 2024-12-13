import { IGenerateRefreshTokenProvider } from '../../../../app/providers/GenerateRefreshToken'
import { ITokenManagerProvider } from '../../../../app/providers/TokenManager'
import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken'
import { RefreshTokenUserUseCase } from '../../../../app/useCases/Authenticate/implementations/RefreshTokenUser'
import { IRefreshTokenUserUseCase } from '../../../../app/useCases/Authenticate/RefreshTokenUser'
import { RefreshTokenUserController } from '../../../../presentation/http/controllers/Authenticate/implementations/RefreshTokenUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GenerateRefreshToken } from '../../../providers/GenerateRefreshToken'
import { TokenManager } from '../../../providers/TokenManager'
import { RefreshTokenRepository } from '../../../repositories/typeorm/RefreshToken'

/**
 * Composer function for creating and configuring the components required for refreshing user token.
 * @function
 * @returns {IController} The configured user token refresh controller.
 */
export function refreshTokenUserComposer(): IController {
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository()
  const refreshTokenGenerator: IGenerateRefreshTokenProvider =
    new GenerateRefreshToken()
  const tokenManager: ITokenManagerProvider = new TokenManager()
  const useCase: IRefreshTokenUserUseCase = new RefreshTokenUserUseCase(
    refreshTokenRepository,
    refreshTokenGenerator,
    tokenManager
  )
  const controller: IController = new RefreshTokenUserController(useCase)
  return controller
}
