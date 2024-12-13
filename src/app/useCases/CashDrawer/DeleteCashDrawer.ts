import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a cash drawer.
 * @interface
 */
export interface IDeleteCashDrawerUseCase {
  /**
   * Executes the delete cash drawer use case.
   * @async
   * @param {number} drawerId - The ID of the cash drawer to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(drawerId: number): Promise<ResponseDTO>
}
