import { IOrderDetailsRepository } from '../../../../app/repositories/OrderDetails'
import { UpdateOrderUseCase } from '../../../../app/useCases/Order/implementations/UpdateOrder'
import { IUpdateOrderUseCase } from '../../../../app/useCases/Order/UpdateOrder'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateOrderController } from '../../../../presentation/http/controllers/Order/implementations/UpdateOrder'
import { OrderDetailsRepository } from '../../../repositories/typeorm/OrderDetails'

/**
 * Composer function for creating and configuring the components required for updating order information.
 * @function
 * @returns {IController} The configured order update controller.
 */
export function updateOrderComposer(): IController {
  const repostory: IOrderDetailsRepository = new OrderDetailsRepository()
  const useCase: IUpdateOrderUseCase = new UpdateOrderUseCase(repostory)
  const controller: IController = new UpdateOrderController(useCase)
  return controller
}
