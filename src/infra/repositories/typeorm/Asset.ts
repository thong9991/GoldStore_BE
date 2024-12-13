import { IAssetRepository } from '../../../app/repositories/Asset'
import { AssetDTO } from '../../../domain/dtos/Asset/Asset'
import { IAssetInRequestDTO } from '../../../domain/dtos/Asset/AssetIn'
import { IAssetOutRequestDTO } from '../../../domain/dtos/Asset/AssetOut'
import { ICreateAssetRequestDTO } from '../../../domain/dtos/Asset/CreateAsset'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the asset repository.
 * @class
 * @implements {IAssetRepository}
 */
export class AssetRepository implements IAssetRepository {
  /**
   * Creates a new asset.
   * @async
   * @param {ICreateAssetRequestDTO} data - The asset data.
   * @returns {Promise<IAssetOutRequestDTO>} The created asset.
   */
  async create(data: ICreateAssetRequestDTO): Promise<IAssetOutRequestDTO> {
    const assetRepository = AppDataSource.getRepository(AssetDTO)
    const asset = assetRepository.create(data)
    const results = await assetRepository.save(asset)
    return results
  }

  /**
   * Deletes a asset by ID.
   * @async
   * @param {number} drawer_id - The ID of the cash drawer to delete.
   * @param {string} asset_type - The type of asset to delete.
   * @returns {Promise<void>} The promise that resolves when the asset is deleted.
   */
  async delete(drawer_id: number, asset_type: string): Promise<void> {
    const assetRepository = AppDataSource.getRepository(AssetDTO)
    await assetRepository.delete({
      cashDrawer: {
        id: drawer_id,
      },
      assetType: asset_type,
    })
  }

  /**
   * Finds a asset by cash drawer ID.
   * @async
   * @param {number} drawer_id - The ID of the cash drawer.
   * @returns {Promise<IAssetInRequestDTO|unknown>} The found asset or undefined.
   */
  async findByCashDrawerId(
    drawer_id: number
  ): Promise<IAssetInRequestDTO | unknown> {
    const assetRepository = AppDataSource.getRepository(AssetDTO)
    const asset = await assetRepository.findOneBy({
      cashDrawer: {
        id: drawer_id,
      },
    })
    return asset
  }

  /**
   * Finds a asset by cash drawer ID and asset type.
   * @async
   * @param {number} drawer_id - The ID of the cash drawer.
   * @param {string} asset_type - The type of asset.
   * @returns {Promise<IAssetInRequestDTO|unknown>} The found asset or undefined.
   */
  async findByDrawerIdAndAssetType(
    drawer_id: number,
    asset_type: string
  ): Promise<IAssetInRequestDTO | unknown> {
    const assetRepository = AppDataSource.getRepository(AssetDTO)
    const asset = await assetRepository.findOneBy({
      cashDrawer: {
        id: drawer_id,
      },
      assetType: asset_type,
    })
    return asset
  }

  /**
   * Retrieves the list of assets in cash drawer.
   * @async
   * @param {number} drawer_id - The ID of the cash drawer.
   * @returns {IAssetInRequestDTO} The list of assets data.
   */
  async findByDrawerId(drawer_id: number): Promise<IAssetInRequestDTO[]> {
    const assetRepository = AppDataSource.getRepository(AssetDTO)
    const assets = await assetRepository.find({
      where: {
        cashDrawer: {
          id: drawer_id,
        },
      },
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        assetType: true,
      },
      cache: 60 * 1000,
    })

    return assets
  }

  /**
   * Retrieves the paginated list of assets.
   * @async
   * @param {number} drawer_id - The ID of the cash drawer.
   * @returns {Promise<PaginationDTO>} The paginated list of assets.
   */
  async findAll(drawer_id: number): Promise<PaginationDTO> {
    const assetRepository = AppDataSource.getRepository(AssetDTO)
    const [assets, total] = await assetRepository.findAndCount({
      where: {
        cashDrawer: { id: drawer_id },
      },
      order: {
        assetType: 'DESC',
      },
      select: {
        id: true,
        cashDrawer: {
          id: true,
          drawerName: true,
        },
        assetType: true,
        amount: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      body: assets,
      total: total,
      page: 1,
      last_page: 1,
    }
  }
}
