import { GoldPriceDTO } from '../../../../domain/dtos/GoldPrice/GoldPrice'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { GoldPriceErrorType } from '../../../../domain/enums/goldPrice/ErrorType'
import { GoldPriceSuccessType } from '../../../../domain/enums/goldPrice/SuccessType'
import { IGoldPriceRepository } from '../../../repositories/GoldPrice'
import { IOrderExchangeRepository } from '../../../repositories/OrderExchange'
import { IProductRepository } from '../../../repositories/Product'
import { IDeleteGoldPriceUseCase } from '../DeleteGoldPrice'

/**
 * Use case for deleting gold price.
 * @class
 * @implements {IDeleteGoldPriceUseCase}
 */
export class DeleteGoldPriceUseCase implements IDeleteGoldPriceUseCase {
  /**
   * Creating an instance of DeleteGoldPriceUseCase.
   * @constructor
   * @param {IGoldPriceRepository} goldPriceRepository - The repository for the gold prices data.
   * @param {IProductRepository} productRepository - The repository for the products data.
   * @param {IOrderExchangeRepository} orderExchangeRepository - The repository for the order exchanges data.
   */
  constructor(
    private goldPriceRepository: IGoldPriceRepository,
    private productRepository: IProductRepository,
    private orderExchangeRepository: IOrderExchangeRepository
  ) {}

  /**
   * Executes the delete gold price use case.
   * @async
   * @param {string} goldType - The ID of the gold price to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(goldType: string): Promise<ResponseDTO> {
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

      const productExist = await this.productRepository.findByGoldType(goldType)
      if (productExist) {
        return {
          data: { error: GoldPriceErrorType.ProductConstraint },
          success: false,
        }
      }

      const orderExist =
        await this.orderExchangeRepository.findByGoldType(goldType)
      if (orderExist) {
        return {
          data: { error: GoldPriceErrorType.OrderConstraint },
          success: false,
        }
      }

      await this.goldPriceRepository.delete(goldType)

      return {
        data: { msg: GoldPriceSuccessType.GoldPriceDeleted },
        success: true,
      }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
