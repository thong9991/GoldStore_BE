import { ResponseDTO } from '../../../../domain/dtos/Response'
import { GoldPriceErrorType } from '../../../../domain/enums/goldPrice/ErrorType'
import { IGoldPriceRepository } from '../../../repositories/GoldPrice'
import { IGetAllGoldPriceUseCase } from '../GetAllGoldPrice'

/**
 * Use case for retrieving all gold prices.
 * @class
 * @implements {IGetAllGoldPriceUseCase}
 */
export class GetAllGoldPriceUseCase implements IGetAllGoldPriceUseCase {
  /**
   * Creates an instance of GetAllGoldPriceUseCase.
   * @constructor
   * @param {IGoldPriceRepository} goldPriceRepository - The repository for gold price data.
   */
  constructor(private goldPriceRepository: IGoldPriceRepository) {}

  /**
   * Executes the retrieve all gold prices use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      if (page == -1) {
        const goldPrices = await this.goldPriceRepository.findAllDataNoPaging()
        return { data: goldPrices, success: true }
      }

      const goldPrices = await this.goldPriceRepository.findAll(page)

      if (goldPrices.total == 0) {
        return {
          data: { error: GoldPriceErrorType.GoldPriceNotFound },
          success: false,
        }
      }

      return { data: goldPrices, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
