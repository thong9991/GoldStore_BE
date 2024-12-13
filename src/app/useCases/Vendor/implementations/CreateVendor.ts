import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ICreateVendorRequestDTO } from '../../../../domain/dtos/Vendor/CreateVendor'
import { VendorDTO } from '../../../../domain/dtos/Vendor/Vendor'
import { VendorEntity } from '../../../../domain/entities/Vendor'
import { VendorErrorType } from '../../../../domain/enums/vendor/ErrorType'
import { IVendorRepository } from '../../../repositories/Vendor'
import { ICreateVendorUseCase } from '../CreateVendor'

/**
 * Use case for creating a new vendor.
 * @class
 * @implements {ICreateVendorUseCase}
 */
export class CreateVendorUseCase implements ICreateVendorUseCase {
  /**
   * Creates an instance of CreateVendorUseCase.
   * @constructor
   * @param {IVendorRepository} vendorRepository - The repository for the vendors data.
   */
  constructor(private vendorRepository: IVendorRepository) {}

  /**
   * Executes the create vendor use case.
   * @async
   * @param {ICreateVendorRequestDTO} data - The creating vendor request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    vendorName,
    vendorCode,
    vendorAddress,
  }: ICreateVendorRequestDTO): Promise<ResponseDTO> {
    try {
      const vendorEntity = VendorEntity.create({
        vendorName,
        vendorCode,
        vendorAddress,
      })

      const vendorExist = (await this.vendorRepository.findByVendorName(
        vendorName
      )) as VendorDTO | null

      if (vendorExist) {
        return {
          data: { error: VendorErrorType.VendorAlreadyExists },
          success: false,
        }
      }

      const vendor = await this.vendorRepository.create(vendorEntity)

      return { data: vendor, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
