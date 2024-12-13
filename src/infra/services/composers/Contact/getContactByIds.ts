import { IContactRepository } from '../../../../app/repositories/Contact'
import { IGetContactByIdsUseCase } from '../../../../app/useCases/Contact/GetContactByIds'
import { GetContactByIdsUseCase } from '../../../../app/useCases/Contact/implementations/GetContactByIds'
import { GetContactByIdsController } from '../../../../presentation/http/controllers/Contact/implementations/GetContactByIds'
import { IController } from '../../../../presentation/http/controllers/IController'
import { ContactRepository } from '../../../repositories/typeorm/Contact'

/**
 * Composer function for creating and configuring the components required for retrieving the specific contacts information.
 * @function
 * @returns {IController} The configured contact retrieval controller.
 */
export function getContactByIdsComposer(): IController {
  const repository: IContactRepository = new ContactRepository()
  const useCase: IGetContactByIdsUseCase = new GetContactByIdsUseCase(
    repository
  )
  const controller: IController = new GetContactByIdsController(useCase)
  return controller
}
