import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { IUserRepository } from '../../../../app/repositories/User'
import { ICreateUserUseCase } from '../../../../app/useCases/User/CreateUser'
import { CreateUserUseCase } from '../../../../app/useCases/User/implementations/CreateUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CreateUserController } from '../../../../presentation/http/controllers/User/implementations/CreateUser'
import { PasswordHasher } from '../../../providers/PasswordHasher'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for user creation.
 * @function
 * @returns {IController} The configured user creation controller.
 */
export function createUserComposer(): IController {
  const repostory: IUserRepository = new UserRepository()
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: ICreateUserUseCase = new CreateUserUseCase(
    repostory,
    passwordHasher
  )
  const controller: IController = new CreateUserController(useCase)
  return controller
}
