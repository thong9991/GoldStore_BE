import { ResponseDTO } from '../../../../domain/dtos/Response'
import { VendorErrorType } from '../../../../domain/enums/vendor/ErrorType'
import { IVendorRepository } from '../../../repositories/Vendor'
import { IGetAllVendorUseCase } from '../GetAllVendor'

/**
 * Use case for retrieving all vendors.
 * @class
 * @implements {IGetAllVendorUseCase}
 */
export class GetAllVendorUseCase implements IGetAllVendorUseCase {
  /**
   * Creates an instance of GetAllVendorUseCase.
   * @constructor
   * @param {IVendorRepository} vendorRepository - The repository for vendor data.
   */
  constructor(private vendorRepository: IVendorRepository) {}

  /**
   * Executes the retrieve all vendors use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const vendors = await this.vendorRepository.findAll(page)

      if (vendors.total == 0) {
        return {
          data: { error: VendorErrorType.VendorNotFound },
          success: false,
        }
      }

      return { data: vendors, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
