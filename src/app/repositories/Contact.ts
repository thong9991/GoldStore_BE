import { IContactInRequestDTO } from '../../domain/dtos/Contact/ContactIn'
import { IContactOutRequestDTO } from '../../domain/dtos/Contact/ContactOut'
import { ICreateContactRequestDTO } from '../../domain/dtos/Contact/CreateContact'
import { IUpdateContactRequestDTO } from '../../domain/dtos/Contact/UpdateContact'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the contact data.
 * @interface
 */
export interface IContactRepository {
  /**
   * Creates a new contact with the provided data.
   * @async
   * @param {ICreateContactRequestDTO} data - The contact data to be created.
   * @returns {Promise<IContactOutRequestDTO>} The created contact data.
   */
  create(data: ICreateContactRequestDTO): Promise<IContactOutRequestDTO>

  /**
   * Updates the contact data with the provided information.
   * @async
   * @param {IContactOutRequestDTO} contact - The contact data to be updated.
   * @param {IUpdateContactRequestDTO} data - The updated contact data.
   * @returns {Promise<IContactOutRequestDTO>} The updated contact data.
   */
  update(
    contact: IContactOutRequestDTO,
    data: IUpdateContactRequestDTO
  ): Promise<IContactOutRequestDTO>

  /**
   * Deletes the contact by its ID.
   * @async
   * @param {number} id - The ID of the contact to be deleted.
   * @returns {Promise<void>} A promise resolves when the contact is deleted.
   */
  delete(id: number): Promise<void>

  /**
   * Finds the contact by its ID.
   * @async
   * @param {number} id - The ID of the contact.
   * @returns {Promise<IContactInRequestDTO|unknown>} The found contact data, or unidentified if not found.
   */
  findById(id: number): Promise<IContactInRequestDTO | unknown>

  /**
   * Finds the contacts by its ID.
   * @async
   * @param {number[]} idList - The ID of the contacts.
   * @returns {Promise<IContactInRequestDTO|unknown>} The found contacts data.
   */
  findByIds(idList: number[]): Promise<IContactInRequestDTO[]>

  /**
   * Retrieves the list of search data.
   * @async
   * @returns {Promise<IContactInRequestDTO>} The search data list.
   */
  findAllSearchData(): Promise<IContactInRequestDTO[]>

  /**
   * Retrieves the paginated list of contacts.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated contact list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
