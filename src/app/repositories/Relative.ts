import { PaginationDTO } from '../../domain/dtos/Pagination'
import { ICreateRelativeRequestDTO } from '../../domain/dtos/Relative/CreateRelative'
import { IRelativeInRequestDTO } from '../../domain/dtos/Relative/RelativeIn'
import { IRelativeOutRequestDTO } from '../../domain/dtos/Relative/RelativeOut'
import { IUpdateRelativeRequestDTO } from '../../domain/dtos/Relative/UpdateRelative'

/**
 * Interface for the repository handling the relative data.
 * @interface
 */
export interface IRelativeRepository {
  /**
   * Creates a new relative with the provided data.
   * @async
   * @param {ICreateRelativeRequestDTO} data - The relative data to be created.
   * @returns {Promise<IRelativeOutRequestDTO>} The created relative data.
   */
  create(data: ICreateRelativeRequestDTO): Promise<IRelativeOutRequestDTO>

  /**
   * Updates the relative data with the provided information.
   * @async
   * @param {IRelativeOutRequestDTO} relative - The relative data to be updated.
   * @param {IUpdateRelativeRequestDTO} data - The updated relative data.
   * @returns {Promise<IRelativeOutRequestDTO>} The updated relative data.
   */
  update(
    relative: IRelativeOutRequestDTO,
    data: IUpdateRelativeRequestDTO
  ): Promise<IRelativeOutRequestDTO>

  /**
   * Deletes the relative by its ID.
   * @async
   * @param {number} id - The ID of the relative to be deleted.
   * @returns {Promise<void>} A promise resolves when the relative is deleted.
   */
  delete(id: number): Promise<void>

  /**
   * Deletes the relatives by their staff ID.
   * @async
   * @param {number} staff_id - The staff ID of the relatives to be deleted.
   * @returns {Promise<void>} A promise resolves when the relatives is deleted.
   */
  deleteByStaffId(staff_id: number): Promise<void>

  /**
   * Finds the relative by its ID.
   * @async
   * @param {number} id - The ID of the relative.
   * @returns {Promise<IRelativeInRequestDTO|unknown>} The found relative data, or unidentified if not found.
   */
  findById(id: number): Promise<IRelativeInRequestDTO | unknown>

  /**
   * Finds the relative by its contact ID.
   * @async
   * @param {number} contact_id - The contact ID of the relative.
   * @returns {Promise<IRelativeInRequestDTO|unknown>} The found relative data, or unidentified if not found.
   */
  findByContactId(contact_id: number): Promise<IRelativeInRequestDTO | unknown>

  /**
   * Retrieves the paginated list of relatives.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated relative list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
