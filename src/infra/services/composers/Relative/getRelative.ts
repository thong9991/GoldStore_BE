import { IRelativeRepository } from '../../../../app/repositories/Relative'
import { IGetAllRelativeUseCase } from '../../../../app/useCases/Relative/GetAllRelative'
import { GetAllRelativeUseCase } from '../../../../app/useCases/Relative/implementations/GetAllRelative'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GetRelativeController } from '../../../../presentation/http/controllers/Relative/implementations/GetRelative'
import { RelativeRepository } from '../../../repositories/typeorm/Relative'

/**
 * Composer function for creating and configuring the components required for retrieving relative information.
 * @function
 * @returns {IController} The configured relative retrieval controller.
 */
export function getRelativeComposer(): IController {
  const repository: IRelativeRepository = new RelativeRepository()
  const useCase: IGetAllRelativeUseCase = new GetAllRelativeUseCase(repository)
  const controller: IController = new GetRelativeController(useCase)
  return controller
}
