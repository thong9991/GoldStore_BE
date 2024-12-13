import { IVendorRepository } from '../../../../app/repositories/Vendor'
import { ICreateVendorUseCase } from '../../../../app/useCases/Vendor/CreateVendor'
import { CreateVendorUseCase } from '../../../../app/useCases/Vendor/implementations/CreateVendor'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CreateVendorController } from '../../../../presentation/http/controllers/Vendor/implementations/CreateVendor'
import { VendorRepository } from '../../../repositories/typeorm/Vendor'

/**
 * Composer function for creating and configuring the components required for vendor creation.
 * @function
 * @returns {IController} The configured vendor creation controller.
 */
export function createVendorComposer(): IController {
  const repostory: IVendorRepository = new VendorRepository()
  const useCase: ICreateVendorUseCase = new CreateVendorUseCase(repostory)
  const controller: IController = new CreateVendorController(useCase)
  return controller
}
