import { IOrderDetailsRepository } from '../../../../app/repositories/OrderDetails'
import { IStaffRepository } from '../../../../app/repositories/Staff'
import { ICreateOrderUseCase } from '../../../../app/useCases/Order/CreateOrder'
import { CreateOrderUseCase } from '../../../../app/useCases/Order/implementations/CreateOrder'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CreateOrderController } from '../../../../presentation/http/controllers/Order/implementations/CreateOrder'
import { OrderDetailsRepository } from '../../../repositories/typeorm/OrderDetails'
import { StaffRepository } from '../../../repositories/typeorm/Staff'

/**
 * Composer function for creating and configuring the components required for order creation.
 * @function
 * @returns {IController} The configured order creation controller.
 */
export function createOrderComposer(): IController {
  const orderDetailsRepository: IOrderDetailsRepository =
    new OrderDetailsRepository()
  const staffRepository: IStaffRepository = new StaffRepository()
  const useCase: ICreateOrderUseCase = new CreateOrderUseCase(
    orderDetailsRepository,
    staffRepository
  )
  const controller: IController = new CreateOrderController(useCase)
  return controller
}
