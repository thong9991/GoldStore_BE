import { AssetDTO } from '../../../../domain/dtos/Asset/Asset'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { AssetErrorType } from '../../../../domain/enums/asset/ErrorType'
import { AssetSuccessType } from '../../../../domain/enums/asset/SuccessType'
import { IAssetRepository } from '../../../repositories/Asset'
import { ICashFlowRepository } from '../../../repositories/CashFlow'
import { IDeleteAssetUseCase } from '../DeleteAsset'

/**
 * Use case for deleting asset.
 * @class
 * @implements {IDeleteAssetUseCase}
 */
export class DeleteAssetUseCase implements IDeleteAssetUseCase {
  /**
   * Creating an instance of DeleteAssetUseCase.
   * @constructor
   * @param {IAssetRepository} assetRepository - The repository for the assets data.
   * @param {ICashFlowRepository} cashFlowRepository - The repository for the cash flow statements data.
   */
  constructor(
    private assetRepository: IAssetRepository,
    private cashFlowRepository: ICashFlowRepository
  ) {}

  /**
   * Executes the delete asset use case.
   * @async
   * @param {number} drawerId - The ID of the cash drawer to delete.
   * @param {string} assetType - The type of asset to delete.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(drawerId: number, assetType: string): Promise<ResponseDTO> {
    try {
      const cashFlowExist =
        await this.cashFlowRepository.findByAssetId(drawerId)
      if (cashFlowExist) {
        return {
          data: { error: AssetErrorType.CashFlowConstraint },
          success: false,
        }
      }

      const assetExist = (await this.assetRepository.findByDrawerIdAndAssetType(
        drawerId,
        assetType
      )) as AssetDTO | null

      if (!assetExist) {
        return {
          data: { error: AssetErrorType.AssetNotExist },
          success: false,
        }
      }

      await this.assetRepository.delete(drawerId, assetType)

      return { data: { msg: AssetSuccessType.AssetDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
