import { CashDrawerDTO } from '../../../../domain/dtos/CashDrawer/CashDrawer'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { CashDrawerErrorType } from '../../../../domain/enums/cashDrawer/ErrorType'
import { CashDrawerSuccessType } from '../../../../domain/enums/cashDrawer/SuccessType'
import { IAssetRepository } from '../../../repositories/Asset'
import { ICashDrawerRepository } from '../../../repositories/CashDrawer'
import { IDeleteCashDrawerUseCase } from '../DeleteCashDrawer'

/**
 * Use case for deleting cash drawer.
 * @class
 * @implements {IDeleteCashDrawerUseCase}
 */
export class DeleteCashDrawerUseCase implements IDeleteCashDrawerUseCase {
  /**
   * Creating an instance of DeleteCashDrawerUseCase.
   * @constructor
   * @param {ICashDrawerRepository} cashDrawerRepository - The repository for the cash drawers data.
   * @param {IAssetRepository} assetRepository - The repository for the assets data.
   */
  constructor(
    private cashDrawerRepository: ICashDrawerRepository,
    private assetRepository: IAssetRepository
  ) {}

  /**
   * Executes the delete cash drawer use case.
   * @async
   * @param {number} drawerId - The ID of the cash drawer to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(drawerId: number): Promise<ResponseDTO> {
    try {
      const cashDrawerExist = (await this.cashDrawerRepository.findById(
        drawerId
      )) as CashDrawerDTO | null

      if (!cashDrawerExist) {
        return {
          data: { error: CashDrawerErrorType.CashDrawerNotExist },
          success: false,
        }
      }

      const assetExist = await this.assetRepository.findByCashDrawerId(drawerId)
      if (assetExist) {
        return {
          data: { error: CashDrawerErrorType.AssetConstraint },
          success: false,
        }
      }

      await this.cashDrawerRepository.delete(drawerId)

      return {
        data: { msg: CashDrawerSuccessType.CashDrawerDeleted },
        success: true,
      }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
