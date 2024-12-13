import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { IUserRepository } from '../../../../app/repositories/User'
import { UpdateUserUseCase } from '../../../../app/useCases/User/implementations/UpdateUser'
import { IUpdateUserUseCase } from '../../../../app/useCases/User/UpdateUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateUserController } from '../../../../presentation/http/controllers/User/implementations/UpdateUser'
import { PasswordHasher } from '../../../providers/PasswordHasher'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for updating user information.
 * @function
 * @returns {IController} The configured user update controller.
 */
export function updateUserComposer(): IController {
  const repostory: IUserRepository = new UserRepository()
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: IUpdateUserUseCase = new UpdateUserUseCase(
    repostory,
    passwordHasher
  )
  const controller: IController = new UpdateUserController(useCase)
  return controller
}
