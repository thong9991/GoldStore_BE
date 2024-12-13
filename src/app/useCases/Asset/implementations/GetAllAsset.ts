import { ResponseDTO } from '../../../../domain/dtos/Response'
import { AssetErrorType } from '../../../../domain/enums/asset/ErrorType'
import { IAssetRepository } from '../../../repositories/Asset'
import { IGetAllAssetUseCase } from '../GetAllAsset'

/**
 * Use case for retrieving all assets.
 * @class
 * @implements {IGetAllAssetUseCase}
 */
export class GetAllAssetUseCase implements IGetAllAssetUseCase {
  /**
   * Creates an instance of GetAllAssetUseCase.
   * @constructor
   * @param {IAssetRepository} assetRepository - The repository for asset data.
   */
  constructor(private assetRepository: IAssetRepository) {}

  /**
   * Executes the retrieve all assets use case.
   * @async
   * @param {number} drawerId - The ID of the cash drawer.
   * @returns {ResponseDTO} The response data.
   */
  async execute(drawerId: number): Promise<ResponseDTO> {
    try {
      const assets = await this.assetRepository.findAll(drawerId)

      if (assets.total == 0) {
        return {
          data: { error: AssetErrorType.AssetNotFound },
          success: false,
        }
      }

      return { data: assets, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
