import { IVendorRepository } from '../../../../app/repositories/Vendor'
import { IGetAllVendorUseCase } from '../../../../app/useCases/Vendor/GetAllVendor'
import { GetAllVendorUseCase } from '../../../../app/useCases/Vendor/implementations/GetAllVendor'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GetVendorController } from '../../../../presentation/http/controllers/Vendor/implementations/GetVendor'
import { VendorRepository } from '../../../repositories/typeorm/Vendor'

/**
 * Composer function for creating and configuring the components required for retrieving vendor information.
 * @function
 * @returns {IController} The configured vendor retrieval controller.
 */
export function getVendorComposer(): IController {
  const repository: IVendorRepository = new VendorRepository()
  const useCase: IGetAllVendorUseCase = new GetAllVendorUseCase(repository)
  const controller: IController = new GetVendorController(useCase)
  return controller
}
