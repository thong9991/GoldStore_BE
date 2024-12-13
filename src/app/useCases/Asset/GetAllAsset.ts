import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all asset.
 * @interface
 */
export interface IGetAllAssetUseCase {
  /**
   * Executes the get all asset use case.
   * @async
   * @param {number} drawerId - The ID of the cash drawer.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(drawerId: number): Promise<ResponseDTO>
}
