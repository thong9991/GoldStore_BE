import { IContactRepository } from '../../../../app/repositories/Contact'
import { IGetAllSearchDataUseCase } from '../../../../app/useCases/Contact/GetAllSearchData'
import { GetAllSearchDataUseCase } from '../../../../app/useCases/Contact/implementations/GetAllSearchData'
import { GetSearchDataController } from '../../../../presentation/http/controllers/Contact/implementations/GetSearchData'
import { IController } from '../../../../presentation/http/controllers/IController'
import { ContactRepository } from '../../../repositories/typeorm/Contact'

/**
 * Composer function for creating and configuring the components required for retrieving search data.
 * @function
 * @returns {IController} The configured search contact data retrieval controller.
 */
export function getSearchDataComposer(): IController {
  const repository: IContactRepository = new ContactRepository()
  const useCase: IGetAllSearchDataUseCase = new GetAllSearchDataUseCase(
    repository
  )
  const controller: IController = new GetSearchDataController(useCase)
  return controller
}
