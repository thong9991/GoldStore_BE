import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUpdateVendorRequestDTO } from '../../../../domain/dtos/Vendor/UpdateVendor'
import { VendorDTO } from '../../../../domain/dtos/Vendor/Vendor'
import { VendorEntity } from '../../../../domain/entities/Vendor'
import { VendorErrorType } from '../../../../domain/enums/vendor/ErrorType'
import { IVendorRepository } from '../../../repositories/Vendor'
import { IUpdateVendorUseCase } from '../UpdateVendor'

/**
 * Use case for updating vendor information.
 * @class
 * @implements {IUpdateVendorUseCase}
 */
export class UpdateVendorUseCase implements IUpdateVendorUseCase {
  /**
   * Creates an instance of UpdateVendorUseCase.
   * @constructor
   * @param {IVendorRepository} vendorRepository - The repository for the vendors data.
   */
  constructor(private vendorRepository: IVendorRepository) {}

  /**
   * Executes the update vendor use case.
   * @async
   * @param {number} vendorId - The ID of the vendor to be updated.
   * @param {IUpdateVendorRequestDTO} requestData - The updated vendor information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    vendorId: number,
    { vendorName, vendorCode, vendorAddress }: IUpdateVendorRequestDTO
  ): Promise<ResponseDTO> {
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

      const vendorEntity = VendorEntity.update({
        vendorName,
        vendorCode,
        vendorAddress,
      })
      const vendor = await this.vendorRepository.update(
        vendorExist,
        vendorEntity
      )

      return { data: vendor, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
