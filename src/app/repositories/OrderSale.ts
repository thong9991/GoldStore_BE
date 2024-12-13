import { IOrderSaleInRequestDTO } from '../../domain/dtos/OrderSale/OrderSaleIn'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the sale order data.
 * @interface
 */
export interface IOrderSaleRepository {
  /**
   * Finds the sale order by its ID.
   * @async
   * @param {number} id - The ID of the sale order.
   * @returns {Promise<IOrderSaleInRequestDTO|unknown>} The found sale order data, or unidentified if not found.
   */
  findById(id: number): Promise<IOrderSaleInRequestDTO | unknown>

  /**
   * Finds the sale order by its product ID.
   * @async
   * @param {number} product_id - The product ID of the sale order.
   * @returns {Promise<IOrderSaleInRequestDTO|unknown>} The found sale order data, or unidentified if not found.
   */
  findByProductId(product_id: number): Promise<IOrderSaleInRequestDTO | unknown>

  /**
   * Retrieves the paginated list of sale orders.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated sale order list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
