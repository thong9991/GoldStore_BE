import { IContactRepository } from '../../../../app/repositories/Contact'
import { IRelativeRepository } from '../../../../app/repositories/Relative'
import { IStaffRepository } from '../../../../app/repositories/Staff'
import { ICreateRelativeUseCase } from '../../../../app/useCases/Relative/CreateRelative'
import { CreateRelativeUseCase } from '../../../../app/useCases/Relative/implementations/CreateRelative'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CreateRelativeController } from '../../../../presentation/http/controllers/Relative/implementations/CreateRelative'
import { ContactRepository } from '../../../repositories/typeorm/Contact'
import { RelativeRepository } from '../../../repositories/typeorm/Relative'
import { StaffRepository } from '../../../repositories/typeorm/Staff'

/**
 * Composer function for creating and configuring the components required for relative creation.
 * @function
 * @returns {IController} The configured relative creation controller.
 */
export function createRelativeComposer(): IController {
  const relativeRepostory: IRelativeRepository = new RelativeRepository()
  const staffRepository: IStaffRepository = new StaffRepository()
  const contactRepository: IContactRepository = new ContactRepository()
  const useCase: ICreateRelativeUseCase = new CreateRelativeUseCase(
    relativeRepostory,
    staffRepository,
    contactRepository
  )
  const controller: IController = new CreateRelativeController(useCase)
  return controller
}
