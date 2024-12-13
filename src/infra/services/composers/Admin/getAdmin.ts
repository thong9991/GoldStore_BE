import { IAdminRepository } from '../../../../app/repositories/Admin'
import { IGetAllAdminUseCase } from '../../../../app/useCases/Admin/GetAllAdmin'
import { GetAllAdminUseCase } from '../../../../app/useCases/Admin/implementations/GetAllAdmin'
import { GetAdminController } from '../../../../presentation/http/controllers/Admin/implementations/GetAdmin'
import { IController } from '../../../../presentation/http/controllers/IController'
import { AdminRepository } from '../../../repositories/typeorm/Admin'

/**
 * Composer function for creating and configuring the components required for retrieving admin user information.
 * @function
 * @returns {IController} The configured admin user retrieval controller.
 */
export function getAdminComposer(): IController {
  const repository: IAdminRepository = new AdminRepository()
  const useCase: IGetAllAdminUseCase = new GetAllAdminUseCase(repository)
  const controller: IController = new GetAdminController(useCase)
  return controller
}
