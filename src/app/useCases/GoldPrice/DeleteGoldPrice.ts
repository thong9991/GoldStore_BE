import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a gold price.
 * @interface
 */
export interface IDeleteGoldPriceUseCase {
  /**
   * Executes the delete gold price use case.
   * @async
   * @param {string} goldType - The type of the gold price to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(goldType: string): Promise<ResponseDTO>
}
