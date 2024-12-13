import { ICashDrawerInRequestDTO } from '../../domain/dtos/CashDrawer/CashDrawerIn'
import { ICashDrawerOutRequestDTO } from '../../domain/dtos/CashDrawer/CashDrawerOut'
import { ICreateCashDrawerRequestDTO } from '../../domain/dtos/CashDrawer/CreateCashDrawer'
import { IUpdateCashDrawerRequestDTO } from '../../domain/dtos/CashDrawer/UpdateCashDrawer'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the cash drawer data.
 * @interface
 */
export interface ICashDrawerRepository {
  /**
   * Creates a new cash drawer with the provided data.
   * @async
   * @param {ICreateCashDrawerRequestDTO} data - The cash drawer data to be created.
   * @returns {Promise<ICashDrawerOutRequestDTO>} The created cash drawer data.
   */
  create(data: ICreateCashDrawerRequestDTO): Promise<ICashDrawerOutRequestDTO>

  /**
   * Updates the cash drawer data with the provided information.
   * @async
   * @param {ICashDrawerOutRequestDTO} cashDrawer - The cash drawer data to be updated.
   * @param {IUpdateCashDrawerRequestDTO} data - The updated cash drawer data.
   * @returns {Promise<ICashDrawerOutRequestDTO>} The updated cash drawer data.
   */
  update(
    cashDrawer: ICashDrawerOutRequestDTO,
    data: IUpdateCashDrawerRequestDTO
  ): Promise<ICashDrawerOutRequestDTO>

  /**
   * Deletes the cash drawer by its ID.
   * @async
   * @param {number} id - The ID of the cash drawer to be deleted.
   * @returns {Promise<void>} A promise resolves when the cash drawer is deleted.
   */
  delete(id: number): Promise<void>

  /**
   * Finds the cash drawer by its ID.
   * @async
   * @param {number} id - The ID of the cash drawer.
   * @returns {Promise<ICashDrawerInRequestDTO|unknown>} The found cash drawer data, or unidentified if not found.
   */
  findById(id: number): Promise<ICashDrawerInRequestDTO | unknown>

  /**
   * Retrieves the list of cash drawer data.
   * @async
   * @returns {Promise<ICashDrawerInRequestDTO>} The all cash drawer list.
   */
  findAllDataNoPaging(): Promise<ICashDrawerInRequestDTO[]>

  /**
   * Retrieves the paginated list of cash drawers.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated cash drawer list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
