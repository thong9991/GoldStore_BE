import { IOrderExchangeRepository } from '../../../app/repositories/OrderExchange'
import { OrderExchangeDTO } from '../../../domain/dtos/OrderExchange/OrderExchange'
import { IOrderExchangeInRequestDTO } from '../../../domain/dtos/OrderExchange/OrderExchangeIn'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the order exchange repository.
 * @class
 * @implements {IOrderExchangeRepository}
 */
export class OrderExchangeRepository implements IOrderExchangeRepository {
  /**
   * Finds a order exchange by ID.
   * @async
   * @param {number} id - The ID of the order exchange to find.
   * @returns {Promise<IOrderExchangeInRequestDTO|unknown>} The found order exchange or undefined.
   */
  async findById(id: number): Promise<IOrderExchangeInRequestDTO | unknown> {
    const orderExchangeRepository =
      AppDataSource.getRepository(OrderExchangeDTO)
    const orderExchange = await orderExchangeRepository.findOneBy({
      id: id,
    })
    return orderExchange
  }

  /**
   * Finds a order exchange by order ID.
   * @async
   * @param {string} order_id - The order ID of the order exchange to find.
   * @returns {Promise<IOrderExchangeInRequestDTO|unknown>} The found order exchange or undefined.
   */
  async findByOrderId(
    order_id: string
  ): Promise<IOrderExchangeInRequestDTO | unknown> {
    const orderExchangeRepository =
      AppDataSource.getRepository(OrderExchangeDTO)
    const orderExchange = await orderExchangeRepository.findOneBy({
      orderDetails: {
        id: order_id,
      },
    })
    return orderExchange
  }

  /**
   * Finds a order exchange by gold type.
   * @async
   * @param {string} goldType - The gold type of the order exchange to search for.
   * @returns {Promise<IOrderExchangeInRequestDTO|unknown>} The found order exchange or undefined.
   */
  async findByGoldType(
    goldType: string
  ): Promise<IOrderExchangeInRequestDTO | unknown> {
    const orderExchangeRepository =
      AppDataSource.getRepository(OrderExchangeDTO)
    const orderExchange = await orderExchangeRepository.findOneBy({
      goldPrice: {
        goldType: goldType,
      },
    })
    return orderExchange
  }

  /**
   * Retrieves the paginated list of order exchanges.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of order exchanges.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4

    const vendorRepository = AppDataSource.getRepository(OrderExchangeDTO)
    const [vendors, total] = await vendorRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        orderDetails: {
          id: true,
          isChecked: true,
          createdAt: true,
          updatedAt: true,
        },
        goldPrice: {
          goldType: true,
        },
      },
    })

    return {
      body: vendors,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
