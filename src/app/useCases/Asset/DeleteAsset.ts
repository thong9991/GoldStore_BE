import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a asset.
 * @interface
 */
export interface IDeleteAssetUseCase {
  /**
   * Executes the delete asset use case.
   * @async
   * @param {number} drawerId - The ID of the cash drawer to delete.
   * @param {string} assetType - The type of asset to delete.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(drawerId: number, assetType: string): Promise<ResponseDTO>
}
