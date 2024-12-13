import { IContactRepository } from '../../../../app/repositories/Contact'
import { IGetAllContactUseCase } from '../../../../app/useCases/Contact/GetAllContact'
import { GetAllContactUseCase } from '../../../../app/useCases/Contact/implementations/GetAllContact'
import { GetContactController } from '../../../../presentation/http/controllers/Contact/implementations/GetContact'
import { IController } from '../../../../presentation/http/controllers/IController'
import { ContactRepository } from '../../../repositories/typeorm/Contact'

/**
 * Composer function for creating and configuring the components required for retrieving contact information.
 * @function
 * @returns {IController} The configured contact retrieval controller.
 */
export function getContactComposer(): IController {
  const repository: IContactRepository = new ContactRepository()
  const useCase: IGetAllContactUseCase = new GetAllContactUseCase(repository)
  const controller: IController = new GetContactController(useCase)
  return controller
}
