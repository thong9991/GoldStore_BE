import { IOrderSaleRepository } from '../../../app/repositories/OrderSale'
import { OrderSaleDTO } from '../../../domain/dtos/OrderSale/OrderSale'
import { IOrderSaleInRequestDTO } from '../../../domain/dtos/OrderSale/OrderSaleIn'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the sale order repository.
 * @class
 * @implements {IOrderSaleRepository}
 */
export class OrderSaleRepository implements IOrderSaleRepository {
  /**
   * Finds a sale order by ID.
   * @async
   * @param {number} id - The ID of the sale order to find.
   * @returns {Promise<IOrderSaleInRequestDTO|unknown>} The found sale order or undefined.
   */
  async findById(id: number): Promise<IOrderSaleInRequestDTO | unknown> {
    const orderSaleRepository = AppDataSource.getRepository(OrderSaleDTO)
    const orderSale = await orderSaleRepository.findOneBy({
      id: id,
    })
    return orderSale
  }

  /**
   * Finds a sale order by product ID.
   * @async
   * @param {number} product_id - The product ID of the sale order to find.
   * @returns {Promise<IOrderSaleInRequestDTO|unknown>} The found sale order or undefined.
   */
  async findByProductId(
    product_id: number
  ): Promise<IOrderSaleInRequestDTO | unknown> {
    const orderSaleRepository = AppDataSource.getRepository(OrderSaleDTO)
    const orderSale = await orderSaleRepository.findOneBy({
      product: { id: product_id },
    })
    return orderSale
  }

  /**
   * Retrieves the paginated list of sale orders.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of sale orders.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4

    const orderSaleRepository = AppDataSource.getRepository(OrderSaleDTO)
    const [orderSales, total] = await orderSaleRepository.findAndCount({
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

        product: {
          id: true,
          productName: true,
          category: true,
          goldPrice: {
            goldType: true,
          },
          goldWeight: true,
          wage: true,
        },
        cutAmount: true,
        newWage: true,
      },
    })

    return {
      body: orderSales,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
