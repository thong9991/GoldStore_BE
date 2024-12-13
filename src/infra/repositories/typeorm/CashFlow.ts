import { ICashFlowRepository } from '../../../app/repositories/CashFlow'
import { AssetDTO } from '../../../domain/dtos/Asset/Asset'
import { CashFlowDTO } from '../../../domain/dtos/CashFlow/CashFlow'
import { ICashFlowInRequestDTO } from '../../../domain/dtos/CashFlow/CashFlowIn'
import { ICashFlowOutRequestDTO } from '../../../domain/dtos/CashFlow/CashFlowOut'
import { ICreateCashFlowRequestDTO } from '../../../domain/dtos/CashFlow/CreateCashFlow'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the cash flow statement repository.
 * @class
 * @implements {ICashFlowRepository}
 */
export class CashFlowRepository implements ICashFlowRepository {
  /**
   * Creates a new cash flow statement.
   * @async
   * @param {ICreateCashFlowRequestDTO} data - The cash flow statement data.
   * @returns {Promise<ICashFlowOutRequestDTO>} The created cash flow statement.
   */
  async create(
    data: ICreateCashFlowRequestDTO
  ): Promise<ICashFlowOutRequestDTO> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    var cashFlow
    try {
      var asset = await queryRunner.manager.findOneBy(AssetDTO, {
        id: data.asset.id,
      })

      var remainingAsset = asset!.amount + data.amount

      await queryRunner.manager.update(
        AssetDTO,
        { id: asset!.id },
        {
          amount: remainingAsset,
        }
      )

      cashFlow = await queryRunner.manager.save(CashFlowDTO, {
        asset: { id: asset!.id },
        amount: data.amount,
      })

      await queryRunner.commitTransaction()
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw e
    } finally {
      await queryRunner.release()
    }
    return cashFlow
  }

  /**
   * Deletes a cash flow statement by ID.
   * @async
   * @param {number} id - The ID of the cash flow statement to delete.
   * @returns {Promise<void>} The promise that resolves when the cash flow statement is deleted.
   */
  async delete(id: number): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      var cashFlow = await queryRunner.manager.findOneBy(CashFlowDTO, {
        id: id,
      })

      var asset = await queryRunner.manager.findOneBy(AssetDTO, {
        cashFlows: {
          id: cashFlow!.id,
        },
      })

      var remainingAsset = asset!.amount - cashFlow!.amount

      await queryRunner.manager.update(
        AssetDTO,
        { id: asset!.id },
        {
          amount: remainingAsset,
        }
      )

      await queryRunner.manager.delete(CashFlowDTO, { id: cashFlow!.id })

      await queryRunner.commitTransaction()
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw e
    } finally {
      await queryRunner.release()
    }
  }

  /**
   * Finds a cash flow statement by ID.
   * @async
   * @param {number} id - The ID of the cash flow statement to find.
   * @returns {Promise<ICashFlowInRequestDTO|unknown>} The found cash flow statement or undefined.
   */
  async findById(id: number): Promise<ICashFlowInRequestDTO | unknown> {
    const cashFlowRepository = AppDataSource.getRepository(CashFlowDTO)
    const cashFlow = await cashFlowRepository.findOneBy({
      id: id,
    })
    return cashFlow
  }

  /**
   * Finds a cash flow statement by asset ID.
   * @async
   * @param {number} asset_id - The asset ID of the cash flow statement to find.
   * @returns {Promise<ICashFlowInRequestDTO|unknown>} The found cash flow statement or undefined.
   */
  async findByAssetId(
    asset_id: number
  ): Promise<ICashFlowInRequestDTO | unknown> {
    const cashFlowRepository = AppDataSource.getRepository(CashFlowDTO)
    const cashFlow = await cashFlowRepository.findOneBy({
      asset: { id: asset_id },
    })
    return cashFlow
  }

  /**
   * Retrieves the paginated list of cash flow statements.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of cash flow statements.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 25

    const cashFlowRepository = AppDataSource.getRepository(CashFlowDTO)
    const [cashFlows, total] = await cashFlowRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        asset: {
          assetType: true,
        },
        amount: true,
        createdAt: true,
      },
    })

    return {
      body: cashFlows,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
