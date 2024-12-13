import { ITokenManagerProvider } from '../../../../app/providers/TokenManager'
import { IAdminRepository } from '../../../../app/repositories/Admin'
import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken'
import { IUserRepository } from '../../../../app/repositories/User'
import { IRecoverUserInformationUseCase } from '../../../../app/useCases/Authenticate/RecoverUserInformation'
import { RecoverUserInformationUseCase } from '../../../../app/useCases/Authenticate/implementations/RecoverUserInfomation'
import { RecoverUserInformationController } from '../../../../presentation/http/controllers/Authenticate/implementations/RecoverUserInformation'
import { IController } from '../../../../presentation/http/controllers/IController'
import { TokenManager } from '../../../providers/TokenManager'
import { AdminRepository } from '../../../repositories/typeorm/Admin'
import { RefreshTokenRepository } from '../../../repositories/typeorm/RefreshToken'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for recovering user information.
 * @function
 * @returns {IController} The configured user information recover controller.
 */
export function recoverUserInformationComposer(): IController {
  const userRepository: IUserRepository = new UserRepository()
  const adminRepository: IAdminRepository = new AdminRepository()
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository()
  const tokenManager: ITokenManagerProvider = new TokenManager()
  const useCase: IRecoverUserInformationUseCase =
    new RecoverUserInformationUseCase(
      userRepository,
      adminRepository,
      refreshTokenRepository,
      tokenManager
    )
  const controller: IController = new RecoverUserInformationController(useCase)
  return controller
}
