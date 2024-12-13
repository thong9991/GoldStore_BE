import { ICreateUserRequestDTO } from '../../domain/dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../../domain/dtos/User/UpdateUser'
import { IUserInRequestDTO } from '../../domain/dtos/User/UserIn'
import { IUserOutRequestDTO } from '../../domain/dtos/User/UserOut'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the user data.
 * @interface
 */
export interface IUserRepository {
  /**
   * Creates a new user with the provided data.
   * @async
   * @param {ICreateUserRequestDTO} data - The user data to be created.
   * @returns {Promise<IUserOutRequestDTO>} The created user data.
   */
  create(data: ICreateUserRequestDTO): Promise<IUserOutRequestDTO>

  /**
   * Updates the user data with the provided information.
   * @async
   * @param {IUserOutRequestDTO} user - The user data to be updated.
   * @param {IUpdateUserRequestDTO} data - The updated user data.
   * @returns {Promise<IUserOutRequestDTO>} The updated user data.
   */
  update(
    user: IUserOutRequestDTO,
    data: IUpdateUserRequestDTO
  ): Promise<IUserOutRequestDTO>

  /**
   * Deletes the user by their ID.
   * @async
   * @param {number} id - The ID of the user to be deleted.
   * @returns {Promise<void>} A promise resolves when the user is deleted.
   */
  delete(id: number): Promise<void>

  /**
   * Deletes the users by their staff ID.
   * @async
   * @param {number} staff_id - The staff ID of the users to be deleted.
   * @returns {Promise<void>} A promise resolves when the user is deleted.
   */
  deleteByStaffId(staff_id: number): Promise<void>

  /**
   * Finds the user by their ID.
   * @async
   * @param {number} id - The ID of the user.
   * @returns {Promise<IUserInRequestDTO|unknown>} The found user data, or unidentified if not found.
   */
  findById(id: number): Promise<IUserInRequestDTO | unknown>

  /**
   * Finds the user by their username.
   * @async
   * @param {string} username - The username of the user.
   * @returns {Promise<IUserInRequestDTO|unknown>} The found user data, or unidentified if not found.
   */
  findByUsername(username: string): Promise<IUserInRequestDTO | unknown>

  /**
   * Finds the user by their email.
   * @async
   * @param {string} email - The email of the user.
   * @returns {Promise<IUserInRequestDTO|unknown>} The found user data, or unidentified if not found.
   */
  findByEmail(email: string): Promise<IUserInRequestDTO | unknown>

  /**
   * Retrieves the list of fcm token.
   * @async
   * @returns {Promise<IUserInRequestDTO>} The fcm token data list.
   */
  findAllFcmToken(): Promise<IUserInRequestDTO[]>

  /**
   * Retrieves the paginated list of users.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated user list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
