import { ICashFlowInRequestDTO } from '../../domain/dtos/CashFlow/CashFlowIn'
import { ICashFlowOutRequestDTO } from '../../domain/dtos/CashFlow/CashFlowOut'
import { ICreateCashFlowRequestDTO } from '../../domain/dtos/CashFlow/CreateCashFlow'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the cash flow statement data.
 * @interface
 */
export interface ICashFlowRepository {
  /**
   * Creates a new cash flow statement with the provided data.
   * @async
   * @param {ICreateCashFlowRequestDTO} data - The cash flow statement data to be created.
   * @returns {Promise<ICashFlowOutRequestDTO>} The created cash flow statement data.
   */
  create(data: ICreateCashFlowRequestDTO): Promise<ICashFlowOutRequestDTO>

  /**
   * Deletes the cash flow statement by its ID.
   * @async
   * @param {number} id - The ID of the cash flow statement to be deleted.
   * @returns {Promise<void>} A promise resolves when the cash flow statement is deleted.
   */
  delete(id: number): Promise<void>

  /**
   * Finds the cash flow statement by its ID.
   * @async
   * @param {number} id - The ID of the cash flow statement.
   * @returns {Promise<ICashFlowInRequestDTO|unknown>} The found cash flow statement data, or unidentified if not found.
   */
  findById(id: number): Promise<ICashFlowInRequestDTO | unknown>

  /**
   * Finds the cash flow statement by its asset ID.
   * @async
   * @param {number} asset_id - The asset ID of the cash flow statement.
   * @returns {Promise<ICashFlowInRequestDTO|unknown>} The found cash flow statement data, or unidentified if not found.
   */
  findByAssetId(asset_id: number): Promise<ICashFlowInRequestDTO | unknown>

  /**
   * Retrieves the paginated list of cash flow statements.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated cash flow statement list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
