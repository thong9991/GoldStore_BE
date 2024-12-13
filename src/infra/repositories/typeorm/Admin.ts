import { IAdminRepository } from '../../../app/repositories/Admin'
import { AdminDTO } from '../../../domain/dtos/Admin/Admin'
import { IAdminInRequestDTO } from '../../../domain/dtos/Admin/AdminIn'
import { IAdminOutRequestDTO } from '../../../domain/dtos/Admin/AdminOut'
import { ICreateAdminRequestDTO } from '../../../domain/dtos/Admin/CreateAdmin'
import { IUpdateAdminRequestDTO } from '../../../domain/dtos/Admin/UpdateAdmin'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the admin repository.
 * @class
 * @implements {IAdminRepository}
 */
export class AdminRepository implements IAdminRepository {
  /**
   * Creates a new admin.
   * @async
   * @param {ICreateAdminRequestDTO} data - The admin data.
   * @returns {Promise<IAdminOutRequestDTO>} The created admin.
   */
  async create(data: ICreateAdminRequestDTO): Promise<IAdminOutRequestDTO> {
    const adminRepository = AppDataSource.getRepository(AdminDTO)
    const admin = adminRepository.create(data)
    const results = await adminRepository.save(admin)
    return results
  }

  /**
   * Updates a admin with new data.
   * @async
   * @param {IAdminOutRequestDTO} admin - The admin to update.
   * @param {IUpdateAdminRequestDTO} data - The updated admin data.
   * @returns {Promise<IAdminOutRequestDTO>} The updated admin.
   */
  async update(
    admin: IAdminOutRequestDTO,
    data: IUpdateAdminRequestDTO
  ): Promise<IAdminOutRequestDTO> {
    const adminRepository = AppDataSource.getRepository(AdminDTO)
    const updatedAdmin = await adminRepository
      .createQueryBuilder('admin')
      .update(AdminDTO)
      .set(data)
      .where('id = :id', { id: admin.id })
      .returning(['id', 'email', 'username', 'password', 'updatedAt'])
      .updateEntity(true)
      .execute()
    return updatedAdmin.raw[0]
  }

  /**
   * Deletes a admin by ID.
   * @async
   * @param {number} id - The ID of the admin to delete.
   * @returns {Promise<void>} The promise that resolves when the admin is deleted.
   */
  async delete(id: number): Promise<void> {
    const adminRepository = AppDataSource.getRepository(AdminDTO)
    await adminRepository.delete({ id: id })
  }

  /**
   * Finds a admin by ID.
   * @async
   * @param {number} id - The ID of the admin to find.
   * @returns {Promise<IAdminInRequestDTO|unknown>} The found admin or undefined.
   */
  async findById(id: number): Promise<IAdminInRequestDTO | unknown> {
    const adminRepository = AppDataSource.getRepository(AdminDTO)
    const admin = await adminRepository.findOneBy({
      id: id,
    })
    return admin
  }

  /**
   * Finds a admin by username.
   * @async
   * @param {string} username - The username to search for.
   * @returns {Promise<IAdminInRequestDTO|unknown>} The found admin or undefined.
   */
  async findByUsername(
    username: string
  ): Promise<IAdminInRequestDTO | unknown> {
    const adminRepository = AppDataSource.getRepository(AdminDTO)
    const admin = await adminRepository.findOneBy({
      username: username,
    })
    return admin
  }

  /**
   * Finds a admin by email.
   * @async
   * @param {string} email - The email to search for.
   * @returns {Promise<IAdminInRequestDTO|unknown>} The found admin or undefined.
   */
  async findByEmail(email: string): Promise<IAdminInRequestDTO | unknown> {
    const adminRepository = AppDataSource.getRepository(AdminDTO)
    const admin = await adminRepository.findOneBy({
      email: email,
    })
    return admin
  }

  /**
   * Retrieves the paginated list of admins.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of admins.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4

    const adminRepository = AppDataSource.getRepository(AdminDTO)
    const [admins, total] = await adminRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      body: admins,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
