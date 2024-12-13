import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ICreateGoldPriceRequestDTO } from '../../../../domain/dtos/GoldPrice/CreateGoldPrice'
import { GoldPriceEntity } from '../../../../domain/entities/GoldPrice'
import { GoldPriceErrorType } from '../../../../domain/enums/goldPrice/ErrorType'
import { IGoldPriceRepository } from '../../../repositories/GoldPrice'
import { ICreateGoldPriceUseCase } from '../CreateGoldPrice'

/**
 * Use case for creating a new gold price.
 * @class
 * @implements {ICreateGoldPriceUseCase}
 */
export class CreateGoldPriceUseCase implements ICreateGoldPriceUseCase {
  /**
   * Creates an instance of CreateGoldPriceUseCase.
   * @constructor
   * @param {IGoldPriceRepository} goldPriceRepository - The repository for the gold prices data.
   */
  constructor(private goldPriceRepository: IGoldPriceRepository) {}

  /**
   * Executes the create gold price use case.
   * @async
   * @param {ICreateGoldPriceRequestDTO} data - The creating gold price request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    goldType,
    askPrice,
    bidPrice,
  }: ICreateGoldPriceRequestDTO): Promise<ResponseDTO> {
    try {
      const goldPriceEntity = GoldPriceEntity.create({
        goldType,
        askPrice,
        bidPrice,
      })

      const goldPriceExist =
        await this.goldPriceRepository.findByGoldType(goldType)
      if (goldPriceExist) {
        return {
          data: { error: GoldPriceErrorType.GoldPriceAlreadyExists },
          success: false,
        }
      }

      const goldPrice = await this.goldPriceRepository.create(goldPriceEntity)

      return { data: goldPrice, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
