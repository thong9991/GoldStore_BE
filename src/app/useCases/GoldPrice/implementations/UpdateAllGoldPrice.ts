import { GoldPriceDTO } from '../../../../domain/dtos/GoldPrice/GoldPrice'
import { IUpdateGoldPriceRequestDTO } from '../../../../domain/dtos/GoldPrice/UpdateGoldPrice'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'
import { GoldPriceEntity } from '../../../../domain/entities/GoldPrice'
import { AuthenticateUserErrorType } from '../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IGoldPriceRepository } from '../../../repositories/GoldPrice'
import { IUserRepository } from '../../../repositories/User'
import { IUpdateAllGoldPriceUseCase } from '../UpdateAllGoldPrice'

/**
 * Use case for updating gold price data.
 * @class
 * @implements {IUpdateAllGoldPriceUseCase}
 */
export class UpdateAllGoldPriceUseCase implements IUpdateAllGoldPriceUseCase {
  /**
   * Creates an instance of UpdateAllGoldPriceUseCase.
   * @constructor
   * @param {IGoldPriceRepository} goldPriceRepository - The repository for the gold prices data.
   * @param {IUserRepository} userRepository - The repository for the users data.
   */
  constructor(
    private goldPriceRepository: IGoldPriceRepository,
    private userRepository: IUserRepository
  ) {}

  /**
   * Executes the update gold price use case.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {IUpdateGoldPriceRequestDTO[]} requestData - The updated gold price data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    userId: number,
    requestData: IUpdateGoldPriceRequestDTO[]
  ): Promise<ResponseDTO> {
    try {
      var updateData = []
      var goldPriceExists = []

      const user = (await this.userRepository.findById(
        userId
      )) as IUserInRequestDTO | null

      if (!user) {
        return { data: { error: UserErrorType.UserNotExist }, success: false }
      }
      if (user.role != 'manager') {
        return {
          data: { error: AuthenticateUserErrorType.AccessDenied },
          success: false,
        }
      }

      for (const goldPrice of requestData) {
        if (goldPrice.goldType && goldPrice.goldType.trim().length != 0) {
          const goldPriceExist = (await this.goldPriceRepository.findByGoldType(
            goldPrice.goldType!
          )) as GoldPriceDTO | null

          if (goldPriceExist) {
            const goldPriceEntity = GoldPriceEntity.update({
              goldType: goldPrice.goldType,
              askPrice: goldPrice.askPrice,
              bidPrice: goldPrice.bidPrice,
            })

            goldPriceExists.push(goldPriceExist)
            updateData.push(goldPriceEntity)
          }
        }
      }

      var updatedGoldPrices = []
      for (var i = 0; i < updateData.length; i++) {
        const goldPrice = await this.goldPriceRepository.update(
          goldPriceExists[i],
          updateData[i]
        )
        updatedGoldPrices.push(goldPrice)
      }

      return { data: updatedGoldPrices, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
