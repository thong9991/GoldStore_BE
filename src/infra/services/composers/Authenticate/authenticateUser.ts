import { IGenerateRefreshTokenProvider } from '../../../../app/providers/GenerateRefreshToken'
import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken'
import { IUserRepository } from '../../../../app/repositories/User'
import { IAuthenticateUserUseCase } from '../../../../app/useCases/Authenticate/AuthenticateUser'
import { AuthenticateUserUseCase } from '../../../../app/useCases/Authenticate/implementations/AuthenticateUser'
import { AuthenticateUserController } from '../../../../presentation/http/controllers/Authenticate/implementations/AuthenticateUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GenerateRefreshToken } from '../../../providers/GenerateRefreshToken'
import { PasswordHasher } from '../../../providers/PasswordHasher'
import { RefreshTokenRepository } from '../../../repositories/typeorm/RefreshToken'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for user authentication.
 * @function
 * @returns {IController} The configured user authentication controller.
 */
export function authenticateUserComposer(): IController {
  const userRepository: IUserRepository = new UserRepository()
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository()
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const refreshTokenGenerator: IGenerateRefreshTokenProvider =
    new GenerateRefreshToken()
  const useCase: IAuthenticateUserUseCase = new AuthenticateUserUseCase(
    userRepository,
    refreshTokenRepository,
    passwordHasher,
    refreshTokenGenerator
  )
  const controller: IController = new AuthenticateUserController(useCase)
  return controller
}
