import { ICreateAssetRequestDTO } from '../../../../domain/dtos/Asset/CreateAsset'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { AssetEntity } from '../../../../domain/entities/Asset'
import { IAssetRepository } from '../../../repositories/Asset'
import { ICreateAssetUseCase } from '../CreateAsset'

/**
 * Use case for creating a new asset.
 * @class
 * @implements {ICreateAssetUseCase}
 */
export class CreateAssetUseCase implements ICreateAssetUseCase {
  /**
   * Creates an instance of CreateAssetUseCase.
   * @constructor
   * @param {IAssetRepository} assetRepository - The repository for the assets data.
   */
  constructor(private assetRepository: IAssetRepository) {}

  /**
   * Executes the create asset use case.
   * @async
   * @param {ICreateAssetRequestDTO} data - The creating asset request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    cashDrawer,
    assetType,
    amount,
  }: ICreateAssetRequestDTO): Promise<ResponseDTO> {
    try {
      const assetEntity = AssetEntity.create({
        cashDrawer,
        assetType,
        amount,
      })

      const asset = await this.assetRepository.create(assetEntity)

      return { data: asset, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
