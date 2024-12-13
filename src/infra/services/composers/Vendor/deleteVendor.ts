import { IProductRepository } from '../../../../app/repositories/Product'
import { IVendorRepository } from '../../../../app/repositories/Vendor'
import { IDeleteVendorUseCase } from '../../../../app/useCases/Vendor/DeleteVendor'
import { DeleteVendorUseCase } from '../../../../app/useCases/Vendor/implementations/DeleteVendor'
import { IController } from '../../../../presentation/http/controllers/IController'
import { DeleteVendorController } from '../../../../presentation/http/controllers/Vendor/implementations/DeleteVendor'
import { ProductRepository } from '../../../repositories/typeorm/Product'
import { VendorRepository } from '../../../repositories/typeorm/Vendor'

/**
 * Composer function for creating and configuring the components required for vendor deletion.
 * @function
 * @returns {IController} The configured vendor deletion controller.
 */
export function deleteVendorComposer(): IController {
  const vendorRepostory: IVendorRepository = new VendorRepository()
  const productRepository: IProductRepository = new ProductRepository()
  const useCase: IDeleteVendorUseCase = new DeleteVendorUseCase(
    vendorRepostory,
    productRepository
  )
  const controller: IController = new DeleteVendorController(useCase)
  return controller
}
