import { IStaffRepository } from '../../../../app/repositories/Staff'
import { IGetProfileUseCase } from '../../../../app/useCases/Profile/GetProfile'
import { GetProfileUseCase } from '../../../../app/useCases/Profile/implementations/GetProfile'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GetProfileController } from '../../../../presentation/http/controllers/Profile/implementations/GetProfile'
import { StaffRepository } from '../../../repositories/typeorm/Staff'

/**
 * Composer function for creating and configuring the components required for retrieving staff information.
 * @function
 * @returns {IController} The configured staff retrieval controller.
 */
export function getProfileComposer(): IController {
  const repository: IStaffRepository = new StaffRepository()
  const useCase: IGetProfileUseCase = new GetProfileUseCase(repository)
  const controller: IController = new GetProfileController(useCase)
  return controller
}
