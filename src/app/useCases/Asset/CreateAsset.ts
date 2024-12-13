import { ICreateAssetRequestDTO } from '../../../domain/dtos/Asset/CreateAsset'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new asset.
 * @interface
 */
export interface ICreateAssetUseCase {
  /**
   * Executes the create asset use case.
   * @async
   * @param {ICreateAssetRequestDTO} data - The data for creating a new asset.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateAssetRequestDTO): Promise<ResponseDTO>
}
