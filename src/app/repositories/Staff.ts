import { PaginationDTO } from '../../domain/dtos/Pagination'
import { ICreateStaffRequestDTO } from '../../domain/dtos/Staff/CreateStaff'
import { IStaffInRequestDTO } from '../../domain/dtos/Staff/StaffIn'
import { IStaffOutRequestDTO } from '../../domain/dtos/Staff/StaffOut'
import { IUpdateStaffRequestDTO } from '../../domain/dtos/Staff/UpdateStaff'

/**
 * Interface for the repository handling the staff data.
 * @interface
 */
export interface IStaffRepository {
  /**
   * Creates a new staff with the provided data.
   * @async
   * @param {ICreateStaffRequestDTO} data - The staff data to be created.
   * @returns {Promise<IStaffOutRequestDTO>} The created staff data.
   */
  create(data: ICreateStaffRequestDTO): Promise<IStaffOutRequestDTO>

  /**
   * Updates the staff data with the provided information.
   * @async
   * @param {IStaffOutRequestDTO} staff - The staff data to be updated.
   * @param {IUpdateStaffRequestDTO} data - The updated staff data.
   * @returns {Promise<IStaffOutRequestDTO>} The updated staff data.
   */
  update(
    staff: IStaffOutRequestDTO,
    data: IUpdateStaffRequestDTO
  ): Promise<IStaffOutRequestDTO>

  /**
   * Deletes the staff by its ID.
   * @async
   * @param {number} id - The ID of the staff to be deleted.
   * @returns {Promise<void>} A promise resolves when the staff is deleted.
   */
  delete(id: number): Promise<void>

  /**
   * Finds the staff by its ID.
   * @async
   * @param {number} id - The ID of the staff.
   * @returns {Promise<IStaffInRequestDTO|unknown>} The found staff data, or unidentified if not found.
   */
  findById(id: number): Promise<IStaffInRequestDTO | unknown>

  /**
   * Finds the staff by user ID.
   * @async
   * @param {number} id - The ID of the user.
   * @returns {Promise<IStaffInRequestDTO|unknown>} The found staff data, or unidentified if not found.
   */
  findByUserId(id: number): Promise<IStaffInRequestDTO | unknown>

  /**
   * Retrieves the list of staff data.
   * @async
   * @returns {Promise<IStaffInRequestDTO>} The all staff list.
   */
  findAllDataNoPaging(): Promise<IStaffInRequestDTO[]>

  /**
   * Retrieves the paginated list of staffs.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated staff list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
