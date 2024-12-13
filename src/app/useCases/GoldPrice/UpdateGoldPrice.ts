import { IUpdateGoldPriceRequestDTO } from '../../../domain/dtos/GoldPrice/UpdateGoldPrice'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating gold price information.
 * @interface
 */
export interface IUpdateGoldPriceUseCase {
  /**
   * Executes the update gold price use case.
   * @async
   * @param {string} goldType - The type of the gold price to be updated.
   * @param {IUpdateGoldPriceRequestDTO} data - The data for updating gold price information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    goldType: string,
    data: IUpdateGoldPriceRequestDTO
  ): Promise<ResponseDTO>
}
