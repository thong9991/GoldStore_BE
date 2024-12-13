import { ResponseDTO } from '../../../domain/dtos/Response'
import { IUpdateVendorRequestDTO } from '../../../domain/dtos/Vendor/UpdateVendor'

/**
 * Interface for the use case of updating vendor information.
 * @interface
 */
export interface IUpdateVendorUseCase {
  /**
   * Executes the update vendor use case.
   * @async
   * @param {number} vendorId - The ID of the vendor to be updated.
   * @param {IUpdateVendorRequestDTO} data - The data for updating vendor information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(vendorId: number, data: IUpdateVendorRequestDTO): Promise<ResponseDTO>
}
