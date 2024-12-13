import { IStaffRepository } from '../../../app/repositories/Staff'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { ICreateStaffRequestDTO } from '../../../domain/dtos/Staff/CreateStaff'
import { StaffDTO } from '../../../domain/dtos/Staff/Staff'
import { IStaffInRequestDTO } from '../../../domain/dtos/Staff/StaffIn'
import { IStaffOutRequestDTO } from '../../../domain/dtos/Staff/StaffOut'
import { IUpdateStaffRequestDTO } from '../../../domain/dtos/Staff/UpdateStaff'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the staff repository.
 * @class
 * @implements {IStaffRepository}
 */
export class StaffRepository implements IStaffRepository {
  /**
   * Creates a new staff.
   * @async
   * @param {ICreateStaffRequestDTO} data - The staff data.
   * @returns {Promise<IStaffOutRequestDTO>} The created staff.
   */
  async create(data: ICreateStaffRequestDTO): Promise<IStaffOutRequestDTO> {
    const staffRepository = AppDataSource.getRepository(StaffDTO)
    const staff = staffRepository.create(data)
    const results = await staffRepository.save(staff)
    return results
  }

  /**
   * Updates a staff with new data.
   * @async
   * @param {IStaffOutRequestDTO} staff - The staff to update.
   * @param {IUpdateStaffRequestDTO} data - The updated staff data.
   * @returns {Promise<IStaffOutRequestDTO>} The updated staff.
   */
  async update(
    staff: IStaffOutRequestDTO,
    data: IUpdateStaffRequestDTO
  ): Promise<IStaffOutRequestDTO> {
    const staffRepository = AppDataSource.getRepository(StaffDTO)
    const updatedStaff = await staffRepository
      .createQueryBuilder('staff')
      .update(StaffDTO)
      .set(data)
      .where('id = :id', { id: staff.id })
      .returning([
        'id',
        'firstName',
        'lastName',
        'phone',
        'address',
        'updatedAt',
      ])
      .updateEntity(true)
      .execute()
    return updatedStaff.raw[0]
  }

  /**
   * Deletes a staff by ID.
   * @async
   * @param {number} id - The ID of the staff to delete.
   * @returns {Promise<void>} The promise that resolves when the staff is deleted.
   */
  async delete(id: number): Promise<void> {
    const staffRepository = AppDataSource.getRepository(StaffDTO)
    await staffRepository.delete({ id: id })
  }

  /**
   * Finds a staff by ID.
   * @async
   * @param {number} id - The ID of the staff to find.
   * @returns {Promise<IStaffInRequestDTO|unknown>} The found staff or undefined.
   */
  async findById(id: number): Promise<IStaffInRequestDTO | unknown> {
    const staffRepository = AppDataSource.getRepository(StaffDTO)
    const staff = await staffRepository.findOneBy({
      id: id,
    })
    return staff
  }

  /**
   * Finds a staff by user ID.
   * @async
   * @param {number} id - The user ID of the staff to find.
   * @returns {Promise<IStaffInRequestDTO|unknown>} The found staff or undefined.
   */
  async findByUserId(id: number): Promise<IStaffInRequestDTO | unknown> {
    const staffRepository = AppDataSource.getRepository(StaffDTO)
    const staff = await staffRepository.findOneBy({
      users: {
        id: id,
      },
    })
    return staff
  }

  /**
   * Retrieves the list of staff.
   * @async
   * @returns {IStaffInRequestDTO} The list of staff data.
   */
  async findAllDataNoPaging(): Promise<IStaffInRequestDTO[]> {
    const staffRepository = AppDataSource.getRepository(StaffDTO)
    const staffs = await staffRepository.find({
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
      cache: 60 * 1000,
    })

    return staffs
  }

  /**
   * Retrieves the paginated list of staffs.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of staffs.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4

    const staffRepository = AppDataSource.getRepository(StaffDTO)
    const [staffs, total] = await staffRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      body: staffs,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
