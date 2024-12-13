import { ICreateGoldPriceRequestDTO } from '../../../domain/dtos/GoldPrice/CreateGoldPrice'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new gold price.
 * @interface
 */
export interface ICreateGoldPriceUseCase {
  /**
   * Executes the create gold price use case.
   * @async
   * @param {ICreateGoldPriceRequestDTO} data - The data for creating a new gold price.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateGoldPriceRequestDTO): Promise<ResponseDTO>
}
