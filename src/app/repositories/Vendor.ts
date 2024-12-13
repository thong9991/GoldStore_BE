import { PaginationDTO } from '../../domain/dtos/Pagination'
import { ICreateVendorRequestDTO } from '../../domain/dtos/Vendor/CreateVendor'
import { IUpdateVendorRequestDTO } from '../../domain/dtos/Vendor/UpdateVendor'
import { IVendorInRequestDTO } from '../../domain/dtos/Vendor/VendorIn'
import { IVendorOutRequestDTO } from '../../domain/dtos/Vendor/VendorOut'

/**
 * Interface for the repository handling the vendor data.
 * @interface
 */
export interface IVendorRepository {
  /**
   * Creates a new vendor with the provided data.
   * @async
   * @param {ICreateVendorRequestDTO} data - The vendor data to be created.
   * @returns {Promise<IVendorOutRequestDTO>} The created vendor data.
   */
  create(data: ICreateVendorRequestDTO): Promise<IVendorOutRequestDTO>

  /**
   * Updates the vendor data with the provided information.
   * @async
   * @param {IVendorOutRequestDTO} vendor - The vendor data to be updated.
   * @param {IUpdateVendorRequestDTO} data - The updated vendor data.
   * @returns {Promise<IVendorOutRequestDTO>} The updated vendor data.
   */
  update(
    vendor: IVendorOutRequestDTO,
    data: IUpdateVendorRequestDTO
  ): Promise<IVendorOutRequestDTO>

  /**
   * Deletes the vendor by its ID.
   * @async
   * @param {number} id - The ID of the vendor to be deleted.
   * @returns {Promise<void>} A promise resolves when the vendor is deleted.
   */
  delete(id: number): Promise<void>

  /**
   * Finds the vendor by its ID.
   * @async
   * @param {number} id - The ID of the vendor.
   * @returns {Promise<IVendorInRequestDTO|unknown>} The found vendor data, or unidentified if not found.
   */
  findById(id: number): Promise<IVendorInRequestDTO | unknown>

  /**
   * Finds the vendor by its name.
   * @async
   * @param {string} vendorName - The name of the vendor.
   * @returns {Promise<IUserInRequestDTO|unknown>} The found vendor data, or unidentified if not found.
   */
  findByVendorName(vendorName: string): Promise<IVendorInRequestDTO | unknown>

  /**
   * Retrieves the list of vendor data.
   * @async
   * @returns {Promise<IVendorInRequestDTO>} The all vendor list.
   */
  findAllDataNoPaging(): Promise<IVendorInRequestDTO[]>

  /**
   * Retrieves the paginated list of vendors.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated vendor list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
