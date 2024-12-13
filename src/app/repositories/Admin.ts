import { IAdminInRequestDTO } from '../../domain/dtos/Admin/AdminIn'
import { IAdminOutRequestDTO } from '../../domain/dtos/Admin/AdminOut'
import { ICreateAdminRequestDTO } from '../../domain/dtos/Admin/CreateAdmin'
import { IUpdateAdminRequestDTO } from '../../domain/dtos/Admin/UpdateAdmin'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the admin data.
 * @interface
 */
export interface IAdminRepository {
  /**
   * Creates a new admin with the provided data.
   * @async
   * @param {ICreateAdminRequestDTO} data - The admin data to be created.
   * @returns {Promise<IAdminOutRequestDTO>} The created admin data.
   */
  create(data: ICreateAdminRequestDTO): Promise<IAdminOutRequestDTO>

  /**
   * Updates the admin data with the provided information.
   * @async
   * @param {IAdminOutRequestDTO} admin - The admin data to be updated.
   * @param {IUpdateAdminRequestDTO} data - The updated admin data.
   * @returns {Promise<IAdminOutRequestDTO>} The updated admin data.
   */
  update(
    admin: IAdminOutRequestDTO,
    data: IUpdateAdminRequestDTO
  ): Promise<IAdminOutRequestDTO>

  /**
   * Deletes the admin by their ID.
   * @async
   * @param {number} id - The ID of the admin to be deleted.
   * @returns {Promise<void>} A promise resolves when the admin is deleted.
   */
  delete(id: number): Promise<void>

  /**
   * Finds the admin by their ID.
   * @async
   * @param {number} id - The ID of the admin.
   * @returns {Promise<IAdminInRequestDTO|unknown>} The found admin data, or unidentified if not found.
   */
  findById(id: number): Promise<IAdminInRequestDTO | unknown>

  /**
   * Finds the admin by their username.
   * @async
   * @param {string} username - The username of the admin.
   * @returns {Promise<IAdminInRequestDTO|unknown>} The found admin data, or unidentified if not found.
   */
  findByUsername(username: string): Promise<IAdminInRequestDTO | unknown>

  /**
   * Finds the admin by their email.
   * @async
   * @param {string} email - The email of the admin.
   * @returns {Promise<IAdminInRequestDTO|unknown>} The found admin data, or unidentified if not found.
   */
  findByEmail(email: string): Promise<IAdminInRequestDTO | unknown>

  /**
   * Retrieves the paginated list of admins.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated admin list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
