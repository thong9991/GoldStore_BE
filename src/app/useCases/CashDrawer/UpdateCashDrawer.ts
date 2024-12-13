import { IUpdateCashDrawerRequestDTO } from '../../../domain/dtos/CashDrawer/UpdateCashDrawer'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating cash drawer information.
 * @interface
 */
export interface IUpdateCashDrawerUseCase {
  /**
   * Executes the update cash drawer use case.
   * @async
   * @param {number} drawerId - The ID of the cash drawer to be updated.
   * @param {IUpdateCashDrawerRequestDTO} data - The data for updating cash drawer information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    drawerId: number,
    data: IUpdateCashDrawerRequestDTO
  ): Promise<ResponseDTO>
}
