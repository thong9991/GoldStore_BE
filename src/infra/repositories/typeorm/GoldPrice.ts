import { IGoldPriceRepository } from '../../../app/repositories/GoldPrice'
import { ICreateGoldPriceRequestDTO } from '../../../domain/dtos/GoldPrice/CreateGoldPrice'
import { GoldPriceDTO } from '../../../domain/dtos/GoldPrice/GoldPrice'
import { IGoldPriceInRequestDTO } from '../../../domain/dtos/GoldPrice/GoldPriceIn'
import { IGoldPriceOutRequestDTO } from '../../../domain/dtos/GoldPrice/GoldPriceOut'
import { IUpdateGoldPriceRequestDTO } from '../../../domain/dtos/GoldPrice/UpdateGoldPrice'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the gold price repository.
 * @class
 * @implements {IGoldPriceRepository}
 */
export class GoldPriceRepository implements IGoldPriceRepository {
  /**
   * Creates a new gold price.
   * @async
   * @param {ICreateGoldPriceRequestDTO} data - The gold price data.
   * @returns {Promise<IGoldPriceOutRequestDTO>} The created gold price.
   */
  async create(
    data: ICreateGoldPriceRequestDTO
  ): Promise<IGoldPriceOutRequestDTO> {
    const goldPriceRepository = AppDataSource.getRepository(GoldPriceDTO)
    const goldPrice = goldPriceRepository.create(data)
    const results = await goldPriceRepository.save(goldPrice)
    return results
  }

  /**
   * Updates a gold price with new data.
   * @async
   * @param {IGoldPriceOutRequestDTO} goldPrice - The gold price to update.
   * @param {IUpdateGoldPriceRequestDTO} data - The updated gold price data.
   * @returns {Promise<IGoldPriceOutRequestDTO>} The updated gold price.
   */
  async update(
    goldPrice: IGoldPriceOutRequestDTO,
    data: IUpdateGoldPriceRequestDTO
  ): Promise<IGoldPriceOutRequestDTO> {
    const goldPriceRepository = AppDataSource.getRepository(GoldPriceDTO)
    const updatedGoldPrice = await goldPriceRepository
      .createQueryBuilder('goldPrice')
      .update(GoldPriceDTO)
      .set(data)
      .where('goldType = :goldType', { goldType: goldPrice.goldType })
      .returning(['goldType', 'askPrice', 'bidPrice', 'updatedAt'])
      .updateEntity(true)
      .execute()
    return updatedGoldPrice.raw[0]
  }

  /**
   * Deletes a gold price by gold type.
   * @async
   * @param {string} goldType - The gold type of the gold price to delete.
   * @returns {Promise<void>} The promise that resolves when the gold price is deleted.
   */
  async delete(goldType: string): Promise<void> {
    const goldPriceRepository = AppDataSource.getRepository(GoldPriceDTO)
    var goldPrice = new GoldPriceDTO()
    goldPrice.goldType = goldType
    await goldPriceRepository.remove([goldPrice])
  }

  /**
   * Finds a gold price by gold type.
   * @async
   * @param {string} goldType - The gold type of the gold price to find.
   * @returns {Promise<IGoldPriceInRequestDTO|unknown>} The found gold price or undefined.
   */
  async findByGoldType(
    goldType: string
  ): Promise<IGoldPriceInRequestDTO | unknown> {
    const goldPriceRepository = AppDataSource.getRepository(GoldPriceDTO)
    const goldPrice = await goldPriceRepository.findOneBy({
      goldType: goldType,
    })
    return goldPrice
  }

  /**
   * Retrieves the list of gold type.
   * @async
   * @returns {IGoldPriceInRequestDTO} The list of gold type data.
   */
  async findAllDataNoPaging(): Promise<IGoldPriceInRequestDTO[]> {
    const goldPriceRepository = AppDataSource.getRepository(GoldPriceDTO)
    const goldPrices = await goldPriceRepository.find({
      order: {
        goldType: 'DESC',
      },
      select: {
        goldType: true,
      },
      cache: 60 * 1000,
    })

    return goldPrices
  }

  /**
   * Retrieves the paginated list of gold prices.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of gold prices.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 10

    const goldPriceRepository = AppDataSource.getRepository(GoldPriceDTO)
    const [goldPrices, total] = await goldPriceRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        goldType: 'DESC',
      },
      select: {
        goldType: true,
        askPrice: true,
        bidPrice: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      body: goldPrices,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
