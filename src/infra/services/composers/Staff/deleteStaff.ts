import { IOrderDetailsRepository } from '../../../../app/repositories/OrderDetails'
import { IRelativeRepository } from '../../../../app/repositories/Relative'
import { IStaffRepository } from '../../../../app/repositories/Staff'
import { IUserRepository } from '../../../../app/repositories/User'
import { IDeleteStaffUseCase } from '../../../../app/useCases/Staff/DeleteStaff'
import { DeleteStaffUseCase } from '../../../../app/useCases/Staff/implementations/DeleteStaff'
import { IController } from '../../../../presentation/http/controllers/IController'
import { DeleteStaffController } from '../../../../presentation/http/controllers/Staff/implementations/DeleteStaff'
import { OrderDetailsRepository } from '../../../repositories/typeorm/OrderDetails'
import { RelativeRepository } from '../../../repositories/typeorm/Relative'
import { StaffRepository } from '../../../repositories/typeorm/Staff'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for staff deletion.
 * @function
 * @returns {IController} The configured staff deletion controller.
 */
export function deleteStaffComposer(): IController {
  const staffRepostory: IStaffRepository = new StaffRepository()
  const userRepository: IUserRepository = new UserRepository()
  const relativeRepository: IRelativeRepository = new RelativeRepository()
  const orderDetailsRepostory: IOrderDetailsRepository =
    new OrderDetailsRepository()

  const useCase: IDeleteStaffUseCase = new DeleteStaffUseCase(
    staffRepostory,
    userRepository,
    relativeRepository,
    orderDetailsRepostory
  )
  const controller: IController = new DeleteStaffController(useCase)
  return controller
}
