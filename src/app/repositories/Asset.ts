import { IAssetInRequestDTO } from '../../domain/dtos/Asset/AssetIn'
import { IAssetOutRequestDTO } from '../../domain/dtos/Asset/AssetOut'
import { ICreateAssetRequestDTO } from '../../domain/dtos/Asset/CreateAsset'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the asset data.
 * @interface
 */
export interface IAssetRepository {
  /**
   * Creates a new asset with the provided data.
   * @async
   * @param {ICreateAssetRequestDTO} data - The asset data to be created.
   * @returns {Promise<IAssetOutRequestDTO>} The created asset data.
   */
  create(data: ICreateAssetRequestDTO): Promise<IAssetOutRequestDTO>

  /**
   * Deletes the asset by its ID.
   * @async
   * @param {number} drawer_id - The ID of the cash drawer to delete.
   * @param {string} asset_type - The type of asset to delete.
   * @returns {Promise<void>} A promise resolves when the asset is deleted.
   */
  delete(drawer_id: number, asset_type: String): Promise<void>

  /**
   * Finds the first asset by its cash drawer ID.
   * @async
   * @param {number} drawer_id - The cash drawer ID of the asset.
   * @returns {Promise<IAssetInRequestDTO|unknown>} The found asset data, or unidentified if not found.
   */
  findByCashDrawerId(drawer_id: number): Promise<IAssetInRequestDTO | unknown>

  /**
   * Finds the asset by its cash drawer ID and asset type.
   * @async
   * @param {number} drawer_id - The ID of the cash drawer.
   * @param {string} asset_type - The type of asset.
   * @returns {Promise<IAssetInRequestDTO|unknown>} The found asset data, or unidentified if not found.
   */
  findByDrawerIdAndAssetType(
    drawer_id: number,
    asset_type: string
  ): Promise<IAssetInRequestDTO | unknown>

  /**
   * Retrieves the list of assets data by cash drawer ID.
   * @async
   * @param {number} drawer_id - The ID of cash drawer.
   * @returns {Promise<IAssetInRequestDTO>} The all assets list.
   */
  findByDrawerId(drawer_id: number): Promise<IAssetInRequestDTO[]>

  /**
   * Retrieves the paginated list of assets.
   * @async
   * @param {number} drawer_id - The ID of the cash drawer.
   * @returns {Promise<PaginationDTO>} The paginated asset list.
   */
  findAll(drawer_id: number): Promise<PaginationDTO>
}
