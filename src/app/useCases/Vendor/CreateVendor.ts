import { ResponseDTO } from '../../../domain/dtos/Response'
import { ICreateVendorRequestDTO } from '../../../domain/dtos/Vendor/CreateVendor'

/**
 * Interface for the use case of creating a new vendor.
 * @interface
 */
export interface ICreateVendorUseCase {
  /**
   * Executes the create vendor use case.
   * @async
   * @param {ICreateVendorRequestDTO} data - The data for creating a new vendor.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateVendorRequestDTO): Promise<ResponseDTO>
}
