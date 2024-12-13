import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { IAdminRepository } from '../../../../app/repositories/Admin'
import { UpdateAdminUseCase } from '../../../../app/useCases/Admin/implementations/UpdateAdmin'
import { IUpdateAdminUseCase } from '../../../../app/useCases/Admin/UpdateAdmin'
import { UpdateAdminController } from '../../../../presentation/http/controllers/Admin/implementations/UpdateAdmin'
import { IController } from '../../../../presentation/http/controllers/IController'
import { PasswordHasher } from '../../../providers/PasswordHasher'
import { AdminRepository } from '../../../repositories/typeorm/Admin'

/**
 * Composer function for creating and configuring the components required for updating admin user information.
 * @function
 * @returns {IController} The configured admin user update controller.
 */
export function updateAdminComposer(): IController {
  const repostory: IAdminRepository = new AdminRepository()
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: IUpdateAdminUseCase = new UpdateAdminUseCase(
    repostory,
    passwordHasher
  )
  const controller: IController = new UpdateAdminController(useCase)
  return controller
}
