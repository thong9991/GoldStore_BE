import { IOrderDetailsRepository } from '../../../../app/repositories/OrderDetails'
import { IGetAllOrderUseCase } from '../../../../app/useCases/Order/GetAllOrder'
import { GetAllOrderUseCase } from '../../../../app/useCases/Order/implementations/GetAllOrder'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GetOrderController } from '../../../../presentation/http/controllers/Order/implementations/GetOrder'
import { OrderDetailsRepository } from '../../../repositories/typeorm/OrderDetails'

/**
 * Composer function for creating and configuring the components required for retrieving order information.
 * @function
 * @returns {IController} The configured order retrieval controller.
 */
export function getOrderComposer(): IController {
  const repository: IOrderDetailsRepository = new OrderDetailsRepository()
  const useCase: IGetAllOrderUseCase = new GetAllOrderUseCase(repository)
  const controller: IController = new GetOrderController(useCase)
  return controller
}
