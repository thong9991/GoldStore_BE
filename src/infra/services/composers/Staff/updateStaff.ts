import { IStaffRepository } from '../../../../app/repositories/Staff'
import { UpdateStaffUseCase } from '../../../../app/useCases/Staff/implementations/UpdateStaff'
import { IUpdateStaffUseCase } from '../../../../app/useCases/Staff/UpdateStaff'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateStaffController } from '../../../../presentation/http/controllers/Staff/implementations/UpdateStaff'
import { StaffRepository } from '../../../repositories/typeorm/Staff'

/**
 * Composer function for creating and configuring the components required for updating staff information.
 * @function
 * @returns {IController} The configured staff update controller.
 */
export function updateStaffComposer(): IController {
  const repostory: IStaffRepository = new StaffRepository()
  const useCase: IUpdateStaffUseCase = new UpdateStaffUseCase(repostory)
  const controller: IController = new UpdateStaffController(useCase)
  return controller
}
