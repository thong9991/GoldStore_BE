import { IVendorRepository } from '../../../app/repositories/Vendor'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { ICreateVendorRequestDTO } from '../../../domain/dtos/Vendor/CreateVendor'
import { IUpdateVendorRequestDTO } from '../../../domain/dtos/Vendor/UpdateVendor'
import { VendorDTO } from '../../../domain/dtos/Vendor/Vendor'
import { IVendorInRequestDTO } from '../../../domain/dtos/Vendor/VendorIn'
import { IVendorOutRequestDTO } from '../../../domain/dtos/Vendor/VendorOut'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the vendor repository.
 * @class
 * @implements {IVendorRepository}
 */
export class VendorRepository implements IVendorRepository {
  /**
   * Creates a new vendor.
   * @async
   * @param {ICreateVendorRequestDTO} data - The vendor data.
   * @returns {Promise<IVendorOutRequestDTO>} The created vendor.
   */
  async create(data: ICreateVendorRequestDTO): Promise<IVendorOutRequestDTO> {
    const vendorRepository = AppDataSource.getRepository(VendorDTO)
    const vendor = vendorRepository.create(data)
    const results = await vendorRepository.save(vendor)
    return results
  }

  /**
   * Updates a vendor with new data.
   * @async
   * @param {IVendorOutRequestDTO} vendor - The vendor to update.
   * @param {IUpdateVendorRequestDTO} data - The updated vendor data.
   * @returns {Promise<IVendorOutRequestDTO>} The updated vendor.
   */
  async update(
    vendor: IVendorOutRequestDTO,
    data: IUpdateVendorRequestDTO
  ): Promise<IVendorOutRequestDTO> {
    const vendorRepository = AppDataSource.getRepository(VendorDTO)
    const updatedVendor = await vendorRepository
      .createQueryBuilder('vendor')
      .update(VendorDTO)
      .set(data)
      .where('id = :id', { id: vendor.id })
      .returning([
        'id',
        'vendorName',
        'vendorCode',
        'vendorAddress',
        'updatedAt',
      ])
      .updateEntity(true)
      .execute()
    return updatedVendor.raw[0]
  }

  /**
   * Deletes a vendor by ID.
   * @async
   * @param {number} id - The ID of the vendor to delete.
   * @returns {Promise<void>} The promise that resolves when the vendor is deleted.
   */
  async delete(id: number): Promise<void> {
    const vendorRepository = AppDataSource.getRepository(VendorDTO)
    await vendorRepository.delete({ id: id })
  }

  /**
   * Finds a vendor by ID.
   * @async
   * @param {number} id - The ID of the vendor to find.
   * @returns {Promise<IVendorInRequestDTO|unknown>} The found vendor or undefined.
   */
  async findById(id: number): Promise<IVendorInRequestDTO | unknown> {
    const vendorRepository = AppDataSource.getRepository(VendorDTO)
    const vendor = await vendorRepository.findOneBy({
      id: id,
    })
    return vendor
  }

  /**
   * Finds a vendor by vendor name.
   * @async
   * @param {string} vendorName - The name of the vendor to search for.
   * @returns {Promise<IVendorInRequestDTO|unknown>} The found vendor or undefined.
   */
  async findByVendorName(
    vendorName: string
  ): Promise<IVendorInRequestDTO | unknown> {
    const vendorRepository = AppDataSource.getRepository(VendorDTO)
    const vendor = await vendorRepository.findOneBy({
      vendorName: vendorName,
    })
    return vendor
  }

  /**
   * Retrieves the list of vendor.
   * @async
   * @returns {IVendorInRequestDTO} The list of vendor data.
   */
  async findAllDataNoPaging(): Promise<IVendorInRequestDTO[]> {
    const vendorRepository = AppDataSource.getRepository(VendorDTO)
    const vendors = await vendorRepository.find({
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        vendorName: true,
      },
      cache: 60 * 1000,
    })

    return vendors
  }

  /**
   * Retrieves the paginated list of vendors.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of vendors.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 10

    const vendorRepository = AppDataSource.getRepository(VendorDTO)
    const [vendors, total] = await vendorRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        vendorName: true,
        vendorCode: true,
        vendorAddress: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      body: vendors,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
