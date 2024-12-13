import { IUserRepository } from '../../../../app/repositories/User'
import { IDeleteUserUseCase } from '../../../../app/useCases/User/DeleteUser'
import { DeleteUserUseCase } from '../../../../app/useCases/User/implementations/DeleteUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { DeleteAccountController } from '../../../../presentation/http/controllers/Profile/implementations/DeleteAccount'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for user account deletion.
 * @function
 * @returns {IController} The configured user deletion controller.
 */
export function deleteAccountComposer(): IController {
  const repostory: IUserRepository = new UserRepository()
  const useCase: IDeleteUserUseCase = new DeleteUserUseCase(repostory)
  const controller: IController = new DeleteAccountController(useCase)
  return controller
}
