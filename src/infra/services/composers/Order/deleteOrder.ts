import { IOrderDetailsRepository } from '../../../../app/repositories/OrderDetails'
import { IDeleteOrderUseCase } from '../../../../app/useCases/Order/DeleteOrder'
import { DeleteOrderUseCase } from '../../../../app/useCases/Order/implementations/DeleteOrder'
import { IController } from '../../../../presentation/http/controllers/IController'
import { DeleteOrderController } from '../../../../presentation/http/controllers/Order/implementations/DeleteOrder'
import { OrderDetailsRepository } from '../../../repositories/typeorm/OrderDetails'

/**
 * Composer function for creating and configuring the components required for order deletion.
 * @function
 * @returns {IController} The configured order deletion controller.
 */
export function deleteOrderComposer(): IController {
  const repostory: IOrderDetailsRepository = new OrderDetailsRepository()
  const useCase: IDeleteOrderUseCase = new DeleteOrderUseCase(repostory)
  const controller: IController = new DeleteOrderController(useCase)
  return controller
}
