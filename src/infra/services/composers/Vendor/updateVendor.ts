import { IVendorRepository } from '../../../../app/repositories/Vendor'
import { UpdateVendorUseCase } from '../../../../app/useCases/Vendor/implementations/UpdateVendor'
import { IUpdateVendorUseCase } from '../../../../app/useCases/Vendor/UpdateVendor'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateVendorController } from '../../../../presentation/http/controllers/Vendor/implementations/UpdateVendor'
import { VendorRepository } from '../../../repositories/typeorm/Vendor'

/**
 * Composer function for creating and configuring the components required for updating vendor information.
 * @function
 * @returns {IController} The configured vendor update controller.
 */
export function updateVendorComposer(): IController {
  const repostory: IVendorRepository = new VendorRepository()
  const useCase: IUpdateVendorUseCase = new UpdateVendorUseCase(repostory)
  const controller: IController = new UpdateVendorController(useCase)
  return controller
}
