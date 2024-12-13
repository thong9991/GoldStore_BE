import { IContactRepository } from '../../../../app/repositories/Contact'
import { IRelativeRepository } from '../../../../app/repositories/Relative'
import { IUserRepository } from '../../../../app/repositories/User'
import { IDeleteContactUseCase } from '../../../../app/useCases/Contact/DeleteContact'
import { DeleteContactUseCase } from '../../../../app/useCases/Contact/implementations/DeleteContact'
import { DeleteContactController } from '../../../../presentation/http/controllers/Contact/implementations/DeleteContact'
import { IController } from '../../../../presentation/http/controllers/IController'
import { ContactRepository } from '../../../repositories/typeorm/Contact'
import { RelativeRepository } from '../../../repositories/typeorm/Relative'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for contact deletion.
 * @function
 * @returns {IController} The configured contact deletion controller.
 */
export function deleteContactComposer(): IController {
  const contactRepository: IContactRepository = new ContactRepository()
  const relativeRepository: IRelativeRepository = new RelativeRepository()
  const userRepository: IUserRepository = new UserRepository()
  const useCase: IDeleteContactUseCase = new DeleteContactUseCase(
    contactRepository,
    relativeRepository,
    userRepository
  )
  const controller: IController = new DeleteContactController(useCase)
  return controller
}
