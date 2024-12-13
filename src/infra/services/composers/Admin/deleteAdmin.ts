import { IAdminRepository } from '../../../../app/repositories/Admin'
import { IDeleteAdminUseCase } from '../../../../app/useCases/Admin/DeleteAdmin'
import { DeleteAdminUseCase } from '../../../../app/useCases/Admin/implementations/DeleteAdmin'
import { DeleteAdminController } from '../../../../presentation/http/controllers/Admin/implementations/DeleteAdmin'
import { IController } from '../../../../presentation/http/controllers/IController'
import { AdminRepository } from '../../../repositories/typeorm/Admin'

/**
 * Composer function for creating and configuring the components required for admin user deletion.
 * @function
 * @returns {IController} The configured admin user deletion controller.
 */
export function deleteAdminComposer(): IController {
  const repostory: IAdminRepository = new AdminRepository()
  const useCase: IDeleteAdminUseCase = new DeleteAdminUseCase(repostory)
  const controller: IController = new DeleteAdminController(useCase)
  return controller
}
