import { IStaffRepository } from '../../../../app/repositories/Staff'
import { ICreateStaffUseCase } from '../../../../app/useCases/Staff/CreateStaff'
import { CreateStaffUseCase } from '../../../../app/useCases/Staff/implementations/CreateStaff'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CreateStaffController } from '../../../../presentation/http/controllers/Staff/implementations/CreateStaff'
import { StaffRepository } from '../../../repositories/typeorm/Staff'

/**
 * Composer function for creating and configuring the components required for staff creation.
 * @function
 * @returns {IController} The configured staff creation controller.
 */
export function createStaffComposer(): IController {
  const repostory: IStaffRepository = new StaffRepository()
  const useCase: ICreateStaffUseCase = new CreateStaffUseCase(repostory)
  const controller: IController = new CreateStaffController(useCase)
  return controller
}
