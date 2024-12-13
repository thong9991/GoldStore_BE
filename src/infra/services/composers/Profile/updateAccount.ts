import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { IUserRepository } from '../../../../app/repositories/User'
import { UpdateAccountUseCase } from '../../../../app/useCases/Profile/implementations/UpdateAccount'
import { IUpdateAccountUseCase } from '../../../../app/useCases/Profile/UpdateAccount'
import { PasswordHasher } from '../../../../infra/providers/PasswordHasher'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateAccountController } from '../../../../presentation/http/controllers/Profile/implementations/UpdateAccount'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for updating user account.
 * @function
 * @returns {IController} The configured user account update controller.
 */
export function updateAccountComposer(): IController {
  const repostory: IUserRepository = new UserRepository()
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: IUpdateAccountUseCase = new UpdateAccountUseCase(
    repostory,
    passwordHasher
  )
  const controller: IController = new UpdateAccountController(useCase)
  return controller
}
