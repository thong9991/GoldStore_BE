import { IContactRepository } from '../../../../app/repositories/Contact'
import { ICreateContactUseCase } from '../../../../app/useCases/Contact/CreateContact'
import { CreateContactUseCase } from '../../../../app/useCases/Contact/implementations/CreateContact'
import { CreateContactController } from '../../../../presentation/http/controllers/Contact/implementations/CreateContact'
import { IController } from '../../../../presentation/http/controllers/IController'
import { ContactRepository } from '../../../repositories/typeorm/Contact'

/**
 * Composer function for creating and configuring the components required for contact creation.
 * @function
 * @returns {IController} The configured contact creation controller.
 */
export function createContactComposer(): IController {
  const repostory: IContactRepository = new ContactRepository()
  const useCase: ICreateContactUseCase = new CreateContactUseCase(repostory)
  const controller: IController = new CreateContactController(useCase)
  return controller
}
