import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { IUserRepository } from '../../../../app/repositories/User'
import { IChangePasswordUseCase } from '../../../../app/useCases/Profile/ChangePassword'
import { ChangePasswordUseCase } from '../../../../app/useCases/Profile/implementations/ChangePassword'
import { PasswordHasher } from '../../../../infra/providers/PasswordHasher'
import { IController } from '../../../../presentation/http/controllers/IController'
import { ChangePasswordController } from '../../../../presentation/http/controllers/Profile/implementations/ChangePassword'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for updating user password.
 * @function
 * @returns {IController} The configured user account update controller.
 */
export function changePasswordComposer(): IController {
  const repostory: IUserRepository = new UserRepository()
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: IChangePasswordUseCase = new ChangePasswordUseCase(
    repostory,
    passwordHasher
  )
  const controller: IController = new ChangePasswordController(useCase)
  return controller
}
