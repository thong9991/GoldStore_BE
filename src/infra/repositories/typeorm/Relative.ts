import { IRelativeRepository } from '../../../app/repositories/Relative'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { ICreateRelativeRequestDTO } from '../../../domain/dtos/Relative/CreateRelative'
import { RelativeDTO } from '../../../domain/dtos/Relative/Relative'
import { IRelativeInRequestDTO } from '../../../domain/dtos/Relative/RelativeIn'
import { IRelativeOutRequestDTO } from '../../../domain/dtos/Relative/RelativeOut'
import { IUpdateRelativeRequestDTO } from '../../../domain/dtos/Relative/UpdateRelative'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the relative repository.
 * @class
 * @implements {IRelativeRepository}
 */
export class RelativeRepository implements IRelativeRepository {
  /**
   * Creates a new relative.
   * @async
   * @param {ICreateRelativeRequestDTO} data - The relative data.
   * @returns {Promise<IRelativeOutRequestDTO>} The created relative.
   */
  async create(
    data: ICreateRelativeRequestDTO
  ): Promise<IRelativeOutRequestDTO> {
    const relativeRepository = AppDataSource.getRepository(RelativeDTO)
    const relative = relativeRepository.create(data)
    const results = await relativeRepository.save(relative)
    return results
  }

  /**
   * Updates a relative with new data.
   * @async
   * @param {IRelativeOutRequestDTO} relative - The relative to update.
   * @param {IUpdateRelativeRequestDTO} data - The updated relative data.
   * @returns {Promise<IRelativeOutRequestDTO>} The updated relative.
   */
  async update(
    relative: IRelativeOutRequestDTO,
    data: IUpdateRelativeRequestDTO
  ): Promise<IRelativeOutRequestDTO> {
    const relativeRepository = AppDataSource.getRepository(RelativeDTO)
    const updatedRelative = await relativeRepository
      .createQueryBuilder('relative')
      .update(RelativeDTO)
      .set(data)
      .where('id = :id', { id: relative.id })
      .returning([
        'id',
        'staff',
        'name',
        'relationship',
        'contact',
        'updatedAt',
      ])
      .updateEntity(true)
      .execute()
    return updatedRelative.raw[0]
  }

  /**
   * Deletes a relative by ID.
   * @async
   * @param {number} id - The ID of the relative to delete.
   * @returns {Promise<void>} The promise that resolves when the relative is deleted.
   */
  async delete(id: number): Promise<void> {
    const relativeRepository = AppDataSource.getRepository(RelativeDTO)
    await relativeRepository.delete({ id: id })
  }

  /**
   * Deletes the relatives by their staff ID.
   * @async
   * @param {number} staff_id - The staff ID of the relatives to be deleted.
   * @returns {Promise<void>} The promise that resolves when the relative is deleted.
   */
  async deleteByStaffId(staff_id: number): Promise<void> {
    const relativeRepository = AppDataSource.getRepository(RelativeDTO)
    await relativeRepository.delete({ staff: { id: staff_id } })
  }

  /**
   * Finds a relative by ID.
   * @async
   * @param {number} id - The ID of the relative to find.
   * @returns {Promise<IRelativeInRequestDTO|unknown>} The found relative or undefined.
   */
  async findById(id: number): Promise<IRelativeInRequestDTO | unknown> {
    const relativeRepository = AppDataSource.getRepository(RelativeDTO)
    const relative = await relativeRepository.findOne({
      where: { id: id },
      select: {
        id: true,
        name: true,
        relationship: true,
        contact: {
          id: true,
        },
      },
      relations: ['contact'],
    })
    return relative
  }

  /**
   * Finds a relative by contact ID.
   * @async
   * @param {number} contact_id - The contact ID of the relative to find.
   * @returns {Promise<IRelativeInRequestDTO|unknown>} The found relative or undefined.
   */
  async findByContactId(
    contact_id: number
  ): Promise<IRelativeInRequestDTO | unknown> {
    const relativeRepository = AppDataSource.getRepository(RelativeDTO)
    const relative = await relativeRepository.findOneBy({
      contact: { id: contact_id },
    })
    return relative
  }

  /**
   * Retrieves the paginated list of relatives.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of relatives.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4

    const relativeRepository = AppDataSource.getRepository(RelativeDTO)
    const [relatives, total] = await relativeRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        staff: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
        },
        name: true,
        relationship: true,
        contact: {
          id: true,
          name: true,
          phoneType: true,
          phone: true,
        },
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      body: relatives,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
