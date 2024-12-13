import { IUserRepository } from '../../../../app/repositories/User'
import { IBindTokenUseCase } from '../../../../app/useCases/User/BindToken'
import { BindTokenUseCase } from '../../../../app/useCases/User/implementations/BindToken'
import { IController } from '../../../../presentation/http/controllers/IController'
import { BindTokenController } from '../../../../presentation/http/controllers/User/implementations/BindToken'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for updating user fcm token.
 * @function
 * @returns {IController} The configured user update controller.
 */
export function bindTokenComposer(): IController {
  const repostory: IUserRepository = new UserRepository()
  const useCase: IBindTokenUseCase = new BindTokenUseCase(repostory)
  const controller: IController = new BindTokenController(useCase)
  return controller
}
