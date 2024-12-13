import { IGenerateRefreshTokenProvider } from '../../../../app/providers/GenerateRefreshToken'
import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { IAdminRepository } from '../../../../app/repositories/Admin'
import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken'
import { IAuthenticateAdminUseCase } from '../../../../app/useCases/Authenticate/AuthenticateAdmin'
import { AuthenticateAdminUseCase } from '../../../../app/useCases/Authenticate/implementations/AuthenticateAdmin'
import { AuthenticateAdminController } from '../../../../presentation/http/controllers/Authenticate/implementations/AuthenticateAdmin'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GenerateRefreshToken } from '../../../providers/GenerateRefreshToken'
import { PasswordHasher } from '../../../providers/PasswordHasher'
import { AdminRepository } from '../../../repositories/typeorm/Admin'
import { RefreshTokenRepository } from '../../../repositories/typeorm/RefreshToken'

/**
 * Composer function for creating and configuring the components required for admin authentication.
 * @function
 * @returns {IController} The configured user authentication controller.
 */
export function authenticateAdminComposer(): IController {
  const userRepository: IAdminRepository = new AdminRepository()
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository()
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const refreshTokenGenerator: IGenerateRefreshTokenProvider =
    new GenerateRefreshToken()
  const useCase: IAuthenticateAdminUseCase = new AuthenticateAdminUseCase(
    userRepository,
    refreshTokenRepository,
    passwordHasher,
    refreshTokenGenerator
  )
  const controller: IController = new AuthenticateAdminController(useCase)
  return controller
}
