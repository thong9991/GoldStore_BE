import { IOrderDetailsRepository } from '../../../../app/repositories/OrderDetails'
import { IDeleteCheckedOrdersUseCase } from '../../../../app/useCases/Order/DeleteCheckedOrders'
import { DeleteCheckedOrderUseCase } from '../../../../app/useCases/Order/implementations/DeleteCheckedOrders'
import { IController } from '../../../../presentation/http/controllers/IController'
import { DeleteCheckedOrdersController } from '../../../../presentation/http/controllers/Order/implementations/DeleteCheckedOrders'
import { OrderDetailsRepository } from '../../../repositories/typeorm/OrderDetails'

/**
 * Composer function for creating and configuring the components required for order deletion.
 * @function
 * @returns {IController} The configured order deletion controller.
 */
export function deleteCheckedOrdersComposer(): IController {
  const repository: IOrderDetailsRepository = new OrderDetailsRepository()
  const useCase: IDeleteCheckedOrdersUseCase = new DeleteCheckedOrderUseCase(
    repository
  )
  const controller: IController = new DeleteCheckedOrdersController(useCase)
  return controller
}
