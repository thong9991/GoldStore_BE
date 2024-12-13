import { IContactRepository } from '../../../../app/repositories/Contact'
import { IUserRepository } from '../../../../app/repositories/User'
import { UpdateContactUseCase } from '../../../../app/useCases/Contact/implementations/UpdateContact'
import { IUpdateContactUseCase } from '../../../../app/useCases/Contact/UpdateContact'
import { UpdateContactController } from '../../../../presentation/http/controllers/Contact/implementations/UpdateContact'
import { IController } from '../../../../presentation/http/controllers/IController'
import { ContactRepository } from '../../../repositories/typeorm/Contact'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for updating contact information.
 * @function
 * @returns {IController} The configured contact update controller.
 */
export function updateContactComposer(): IController {
  const contactRepository: IContactRepository = new ContactRepository()
  const userRepository: IUserRepository = new UserRepository()
  const useCase: IUpdateContactUseCase = new UpdateContactUseCase(
    contactRepository,
    userRepository
  )
  const controller: IController = new UpdateContactController(useCase)
  return controller
}
