import { IStaffRepository } from '../../../../app/repositories/Staff'
import { IGetAllStaffUseCase } from '../../../../app/useCases/Staff/GetAllStaff'
import { GetAllStaffUseCase } from '../../../../app/useCases/Staff/implementations/GetAllStaff'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GetStaffController } from '../../../../presentation/http/controllers/Staff/implementations/GetStaff'
import { StaffRepository } from '../../../repositories/typeorm/Staff'

/**
 * Composer function for creating and configuring the components required for retrieving staff information.
 * @function
 * @returns {IController} The configured staff retrieval controller.
 */
export function getStaffComposer(): IController {
  const repository: IStaffRepository = new StaffRepository()
  const useCase: IGetAllStaffUseCase = new GetAllStaffUseCase(repository)
  const controller: IController = new GetStaffController(useCase)
  return controller
}
