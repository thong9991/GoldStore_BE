import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a vendor.
 * @interface
 */
export interface IDeleteVendorUseCase {
  /**
   * Executes the delete vendor use case.
   * @async
   * @param {number} vendorId - The ID of the vendor to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(vendorId: number): Promise<ResponseDTO>
}
