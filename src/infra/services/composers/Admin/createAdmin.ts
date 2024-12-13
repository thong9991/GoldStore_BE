import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { IAdminRepository } from '../../../../app/repositories/Admin'
import { ICreateAdminUseCase } from '../../../../app/useCases/Admin/CreateAdmin'
import { CreateAdminUseCase } from '../../../../app/useCases/Admin/implementations/CreateAdmin'
import { CreateAdminController } from '../../../../presentation/http/controllers/Admin/implementations/CreateAdmin'
import { IController } from '../../../../presentation/http/controllers/IController'
import { PasswordHasher } from '../../../providers/PasswordHasher'
import { AdminRepository } from '../../../repositories/typeorm/Admin'

/**
 * Composer function for creating and configuring the components required for admin user creation.
 * @function
 * @returns {IController} The configured admin user creation controller.
 */
export function createAdminComposer(): IController {
  const repostory: IAdminRepository = new AdminRepository()
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: ICreateAdminUseCase = new CreateAdminUseCase(
    repostory,
    passwordHasher
  )
  const controller: IController = new CreateAdminController(useCase)
  return controller
}
