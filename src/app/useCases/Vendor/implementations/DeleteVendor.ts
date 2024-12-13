import { ResponseDTO } from '../../../../domain/dtos/Response'
import { VendorDTO } from '../../../../domain/dtos/Vendor/Vendor'
import { VendorErrorType } from '../../../../domain/enums/vendor/ErrorType'
import { VendorSuccessType } from '../../../../domain/enums/vendor/SuccessType'
import { IProductRepository } from '../../../repositories/Product'
import { IVendorRepository } from '../../../repositories/Vendor'
import { IDeleteVendorUseCase } from '../DeleteVendor'

/**
 * Use case for deleting vendor.
 * @class
 * @implements {IDeleteVendorUseCase}
 */
export class DeleteVendorUseCase implements IDeleteVendorUseCase {
  /**
   * Creating an instance of DeleteVendorUseCase.
   * @constructor
   * @param {IVendorRepository} vendorRepository - The repository for the vendors data.
   * @param {IProductRepository} productRepository - The repository for the products data.
   */
  constructor(
    private vendorRepository: IVendorRepository,
    private productRepository: IProductRepository
  ) {}

  /**
   * Executes the delete vendor use case.
   * @async
   * @param {number} vendorId - The ID of the vendor to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(vendorId: number): Promise<ResponseDTO> {
    try {
      const vendorExist = (await this.vendorRepository.findById(
        vendorId
      )) as VendorDTO | null

      if (!vendorExist) {
        return {
          data: { error: VendorErrorType.VendorNotExist },
          success: false,
        }
      }

      const productExist = await this.productRepository.findByVendorId(vendorId)
      if (productExist) {
        return {
          data: { error: VendorErrorType.ProductConstraint },
          success: false,
        }
      }

      await this.vendorRepository.delete(vendorId)

      return { data: { msg: VendorSuccessType.VendorDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
