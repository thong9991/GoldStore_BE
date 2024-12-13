import { ICashDrawerRepository } from '../../../app/repositories/CashDrawer'
import { CashDrawerDTO } from '../../../domain/dtos/CashDrawer/CashDrawer'
import { ICashDrawerInRequestDTO } from '../../../domain/dtos/CashDrawer/CashDrawerIn'
import { ICashDrawerOutRequestDTO } from '../../../domain/dtos/CashDrawer/CashDrawerOut'
import { ICreateCashDrawerRequestDTO } from '../../../domain/dtos/CashDrawer/CreateCashDrawer'
import { IUpdateCashDrawerRequestDTO } from '../../../domain/dtos/CashDrawer/UpdateCashDrawer'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the cash drawer repository.
 * @class
 * @implements {ICashDrawerRepository}
 */
export class CashDrawerRepository implements ICashDrawerRepository {
  /**
   * Creates a new cash drawer.
   * @async
   * @param {ICreateCashDrawerRequestDTO} data - The cash drawer data.
   * @returns {Promise<ICashDrawerOutRequestDTO>} The created cash drawer.
   */
  async create(
    data: ICreateCashDrawerRequestDTO
  ): Promise<ICashDrawerOutRequestDTO> {
    const cashDrawerRepository = AppDataSource.getRepository(CashDrawerDTO)
    const cashDrawer = cashDrawerRepository.create(data)
    const results = await cashDrawerRepository.save(cashDrawer)
    return results
  }

  /**
   * Updates a cash drawer with new data.
   * @async
   * @param {ICashDrawerOutRequestDTO} cashDrawer - The cash drawer to update.
   * @param {IUpdateCashDrawerRequestDTO} data - The updated cash drawer data.
   * @returns {Promise<ICashDrawerOutRequestDTO>} The updated cash drawer.
   */
  async update(
    cashDrawer: ICashDrawerOutRequestDTO,
    data: IUpdateCashDrawerRequestDTO
  ): Promise<ICashDrawerOutRequestDTO> {
    const cashDrawerRepository = AppDataSource.getRepository(CashDrawerDTO)
    const updatedCashDrawer = await cashDrawerRepository
      .createQueryBuilder('cashDrawer')
      .update(CashDrawerDTO)
      .set(data)
      .where('id = :id', { id: cashDrawer.id })
      .returning(['id', 'drawerName', 'drawerType', 'updatedAt'])
      .updateEntity(true)
      .execute()
    return updatedCashDrawer.raw[0]
  }

  /**
   * Deletes a cash drawer by ID.
   * @async
   * @param {number} id - The ID of the cash drawer to delete.
   * @returns {Promise<void>} The promise that resolves when the cash drawer is deleted.
   */
  async delete(id: number): Promise<void> {
    const cashDrawerRepository = AppDataSource.getRepository(CashDrawerDTO)
    await cashDrawerRepository.delete({ id: id })
  }

  /**
   * Finds a cash drawer by ID.
   * @async
   * @param {number} id - The ID of the cash drawer to find.
   * @returns {Promise<ICashDrawerInRequestDTO|unknown>} The found cash drawer or undefined.
   */
  async findById(id: number): Promise<ICashDrawerInRequestDTO | unknown> {
    const cashDrawerRepository = AppDataSource.getRepository(CashDrawerDTO)
    const cashDrawer = await cashDrawerRepository.findOneBy({
      id: id,
    })
    return cashDrawer
  }

  /**
   * Retrieves the list of cash drawer.
   * @async
   * @returns {ICashDrawerInRequestDTO} The list of cash drawer data.
   */
  async findAllDataNoPaging(): Promise<ICashDrawerInRequestDTO[]> {
    const cashDrawerRepository = AppDataSource.getRepository(CashDrawerDTO)
    const cashDrawers = await cashDrawerRepository.find({
      order: {
        drawerName: 'ASC',
      },
      select: {
        id: true,
        drawerName: true,
      },
      cache: 60 * 1000,
    })

    return cashDrawers
  }

  /**
   * Retrieves the paginated list of cash drawers.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of cash drawers.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4

    const cashDrawerRepository = AppDataSource.getRepository(CashDrawerDTO)
    const [cashDrawers, total] = await cashDrawerRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        drawerName: true,
        drawerType: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      body: cashDrawers,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
