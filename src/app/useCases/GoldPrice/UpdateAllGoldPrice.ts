import { IUpdateGoldPriceRequestDTO } from '../../../domain/dtos/GoldPrice/UpdateGoldPrice'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating all gold price data.
 * @interface
 */
export interface IUpdateAllGoldPriceUseCase {
  /**
   * Executes the update gold price use case.
   * @async
   * @param {number} userId - the ID of the user.
   * @param {IUpdateGoldPriceRequestDTO[]} data - The data for updating gold price information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    userId: number,
    data: IUpdateGoldPriceRequestDTO[]
  ): Promise<ResponseDTO>
}
