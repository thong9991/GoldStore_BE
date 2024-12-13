import { GoldPriceDTO } from '../../../../domain/dtos/GoldPrice/GoldPrice'
import { IUpdateGoldPriceRequestDTO } from '../../../../domain/dtos/GoldPrice/UpdateGoldPrice'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { GoldPriceEntity } from '../../../../domain/entities/GoldPrice'
import { GoldPriceErrorType } from '../../../../domain/enums/goldPrice/ErrorType'
import { IGoldPriceRepository } from '../../../repositories/GoldPrice'
import { IUpdateGoldPriceUseCase } from '../UpdateGoldPrice'

/**
 * Use case for updating gold price information.
 * @class
 * @implements {IUpdateGoldPriceUseCase}
 */
export class UpdateGoldPriceUseCase implements IUpdateGoldPriceUseCase {
  /**
   * Creates an instance of UpdateGoldPriceUseCase.
   * @constructor
   * @param {IGoldPriceRepository} goldPriceRepository - The repository for the gold prices data.
   */
  constructor(private goldPriceRepository: IGoldPriceRepository) {}

  /**
   * Executes the update gold price use case.
   * @async
   * @param {string} goldType - The ID of the gold price to be updated.
   * @param {IUpdateGoldPriceRequestDTO} requestData - The updated gold price information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    goldType: string,
    { askPrice, bidPrice }: IUpdateGoldPriceRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const goldPriceExist = (await this.goldPriceRepository.findByGoldType(
        goldType
      )) as GoldPriceDTO | null

      if (!goldPriceExist) {
        return {
          data: { error: GoldPriceErrorType.GoldPriceNotExist },
          success: false,
        }
      }

      const goldPriceEntity = GoldPriceEntity.update({
        goldType,
        askPrice,
        bidPrice,
      })

      const goldPrice = await this.goldPriceRepository.update(
        goldPriceExist,
        goldPriceEntity
      )

      return { data: goldPrice, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
