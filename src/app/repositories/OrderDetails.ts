import { ICreateOrderDetailsRequestDTO } from '../../domain/dtos/OrderDetails/CreateOrderDetails'
import { IOrderDetailsInRequestDTO } from '../../domain/dtos/OrderDetails/OrderDetailsIn'
import { IOrderDetailsOutRequestDTO } from '../../domain/dtos/OrderDetails/OrderDetailsOut'
import { IUpdateOrderDetailsRequestDTO } from '../../domain/dtos/OrderDetails/UpdateOrderDetails'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the order data.
 * @interface
 */
export interface IOrderDetailsRepository {
  /**
   * Creates a new order with the provided data.
   * @async
   * @param {ICreateOrderDetailsRequestDTO} data - The order data to be created.
   * @returns {Promise<IOrderDetailsOutRequestDTO>} The created order data.
   */
  create(
    data: ICreateOrderDetailsRequestDTO
  ): Promise<IOrderDetailsOutRequestDTO>

  /**
   * Updates the order data with the provided information.
   * @async
   * @param {IOrderDetailsOutRequestDTO} order - The order data to be updated.
   * @param {IUpdateOrderDetailsRequestDTO} data - The updated order data.
   * @returns {Promise<IOrderDetailsOutRequestDTO>} The updated order data.
   */
  update(
    order: IOrderDetailsOutRequestDTO,
    data: IUpdateOrderDetailsRequestDTO
  ): Promise<IOrderDetailsOutRequestDTO>

  /**
   * Deletes the order by its ID.
   * @async
   * @param {string} id - The ID of the order to be deleted.
   * @returns {Promise<void>} A promise resolves when the order is deleted.
   */
  delete(id: string): Promise<void>

  /**
   * Finds the order by its ID.
   * @async
   * @param {string} id - The ID of the order.
   * @returns {Promise<IOrderDetailsInRequestDTO|unknown>} The found order data, or unidentified if not found.
   */
  findById(id: string): Promise<IOrderDetailsInRequestDTO | unknown>

  /**
   * Finds the first remaining order by staff ID.
   * @async
   * @param {number} staff_id - The ID of the staff.
   * @returns {Promise<IOrderDetailsInRequestDTO|unknown>} The found order data, or unidentified if not found.
   */
  findByStaffId(staff_id: number): Promise<IOrderDetailsInRequestDTO | unknown>

  /**
   * Retrieves the paginated list of checked orders.
   * @async
   * @param {number} staff_id - The ID of the staff.
   * @returns {Promise<PaginationDTO>} The paginated checked order list.
   */
  findCheckedOrders(staff_id: number): Promise<PaginationDTO>

  /**
   * Retrieves the paginated list of orders.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated order list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
