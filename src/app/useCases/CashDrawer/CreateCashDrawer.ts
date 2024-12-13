import { ICreateCashDrawerRequestDTO } from '../../../domain/dtos/CashDrawer/CreateCashDrawer'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new cash drawer.
 * @interface
 */
export interface ICreateCashDrawerUseCase {
  /**
   * Executes the create cash drawer use case.
   * @async
   * @param {ICreateCashDrawerRequestDTO} data - The data for creating a new cash drawer.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateCashDrawerRequestDTO): Promise<ResponseDTO>
}
