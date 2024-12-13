import { IRelativeRepository } from '../../../../app/repositories/Relative'
import { UpdateRelativeUseCase } from '../../../../app/useCases/Relative/implementations/UpdateRelative'
import { IUpdateRelativeUseCase } from '../../../../app/useCases/Relative/UpdateRelative'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateRelativeController } from '../../../../presentation/http/controllers/Relative/implementations/UpdateRelative'
import { RelativeRepository } from '../../../repositories/typeorm/Relative'

/**
 * Composer function for creating and configuring the components required for updating relative information.
 * @function
 * @returns {IController} The configured relative update controller.
 */
export function updateRelativeComposer(): IController {
  const repostory: IRelativeRepository = new RelativeRepository()
  const useCase: IUpdateRelativeUseCase = new UpdateRelativeUseCase(repostory)
  const controller: IController = new UpdateRelativeController(useCase)
  return controller
}
