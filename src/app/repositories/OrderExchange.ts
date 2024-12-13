import { IOrderExchangeInRequestDTO } from '../../domain/dtos/OrderExchange/OrderExchangeIn'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the order exchange data.
 * @interface
 */
export interface IOrderExchangeRepository {
  /**
   * Finds the order exchange by its ID.
   * @async
   * @param {number} id - The ID of the order exchange.
   * @returns {Promise<IOrderExchangeInRequestDTO|unknown>} The found order exchange data, or unidentified if not found.
   */
  findById(id: number): Promise<IOrderExchangeInRequestDTO | unknown>

  /**
   * Finds the first order exchange by its order ID.
   * @async
   * @param {string} order_id - The order ID of the order.
   * @returns {Promise<IOrderExchangeInRequestDTO|unknown>} The found order exchange data, or unidentified if not found.
   */
  findByOrderId(order_id: string): Promise<IOrderExchangeInRequestDTO | unknown>

  /**
   * Finds the first order exchange by its gold type.
   * @async
   * @param {string} goldType - The gold type of the order exchange.
   * @returns {Promise<IOrderExchangeInRequestDTO|unknown>} The found order exchange data, or unidentified if not found.
   */
  findByGoldType(
    goldType: string
  ): Promise<IOrderExchangeInRequestDTO | unknown>

  /**
   * Retrieves the paginated list of order exchanges.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated order exchange list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
