import { IStaffRepository } from '../../../../app/repositories/Staff'
import { IUserRepository } from '../../../../app/repositories/User'
import { UpdateProfileUseCase } from '../../../../app/useCases/Profile/implementations/UpdateProfile'
import { IUpdateProfileUseCase } from '../../../../app/useCases/Profile/UpdateProfile'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateProfileController } from '../../../../presentation/http/controllers/Profile/implementations/UpdateProfile'
import { StaffRepository } from '../../../repositories/typeorm/Staff'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for updating profile information.
 * @function
 * @returns {IController} The configured profile update controller.
 */
export function updateProfileComposer(): IController {
  const userRepository: IUserRepository = new UserRepository()
  const staffRepostory: IStaffRepository = new StaffRepository()
  const useCase: IUpdateProfileUseCase = new UpdateProfileUseCase(
    staffRepostory,
    userRepository
  )
  const controller: IController = new UpdateProfileController(useCase)
  return controller
}
