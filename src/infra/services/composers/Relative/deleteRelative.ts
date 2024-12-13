import { IRelativeRepository } from '../../../../app/repositories/Relative'
import { IDeleteRelativeUseCase } from '../../../../app/useCases/Relative/DeleteRelative'
import { DeleteRelativeUseCase } from '../../../../app/useCases/Relative/implementations/DeleteRelative'
import { IController } from '../../../../presentation/http/controllers/IController'
import { DeleteRelativeController } from '../../../../presentation/http/controllers/Relative/implementations/DeleteRelative'
import { RelativeRepository } from '../../../repositories/typeorm/Relative'

/**
 * Composer function for creating and configuring the components required for relative deletion.
 * @function
 * @returns {IController} The configured relative deletion controller.
 */
export function deleteRelativeComposer(): IController {
  const repostory: IRelativeRepository = new RelativeRepository()
  const useCase: IDeleteRelativeUseCase = new DeleteRelativeUseCase(repostory)
  const controller: IController = new DeleteRelativeController(useCase)
  return controller
}
