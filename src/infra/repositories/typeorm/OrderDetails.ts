import { ulid } from 'ulidx'
import { IOrderDetailsRepository } from '../../../app/repositories/OrderDetails'
import { ICreateOrderDetailsRequestDTO } from '../../../domain/dtos/OrderDetails/CreateOrderDetails'
import { OrderDetailsDTO } from '../../../domain/dtos/OrderDetails/OrderDetails'
import { IOrderDetailsInRequestDTO } from '../../../domain/dtos/OrderDetails/OrderDetailsIn'
import { IOrderDetailsOutRequestDTO } from '../../../domain/dtos/OrderDetails/OrderDetailsOut'
import { IUpdateOrderDetailsRequestDTO } from '../../../domain/dtos/OrderDetails/UpdateOrderDetails'
import { OrderExchangeDTO } from '../../../domain/dtos/OrderExchange/OrderExchange'
import { OrderSaleDTO } from '../../../domain/dtos/OrderSale/OrderSale'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the order repository.
 * @class
 * @implements {IOrderDetailsRepository}
 */
export class OrderDetailsRepository implements IOrderDetailsRepository {
  /**
   * Creates a new order.
   * @async
   * @param {ICreateOrderDetailsRequestDTO} data - The order data.
   * @returns {Promise<IOrderDetailsOutRequestDTO>} The created order.
   */
  async create(
    data: ICreateOrderDetailsRequestDTO
  ): Promise<IOrderDetailsOutRequestDTO> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    var savedOrderDetails
    try {
      const id = ulid()
      savedOrderDetails = await queryRunner.manager.save(OrderDetailsDTO, {
        id: id,
        staff: data.staff,
        total: data.total,
        goldToCash: data.goldToCash,
        discount: data.discount,
        isChecked: data.isChecked,
        description: data.description,
      })

      if (data.orderExchanges) {
        for (var orderExchange of data.orderExchanges) {
          await queryRunner.manager.save(OrderExchangeDTO, {
            ...orderExchange,
            orderDetails: savedOrderDetails,
          })
        }
      }

      if (data.orderSales) {
        for (var orderSale of data.orderSales) {
          await queryRunner.manager.save(OrderSaleDTO, {
            ...orderSale,
            orderDetails: savedOrderDetails,
          })
        }
      }

      await queryRunner.commitTransaction()
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw e
    } finally {
      await queryRunner.release()
    }
    return savedOrderDetails
  }

  /**
   * Updates a order with new data.
   * @async
   * @param {IOrderDetailsOutRequestDTO} orderDetails - The order to update.
   * @param {IUpdateOrderDetailsRequestDTO} data - The updated order data.
   * @returns {Promise<IOrderDetailsOutRequestDTO>} The updated order.
   */
  async update(
    orderDetails: IOrderDetailsOutRequestDTO,
    data: IUpdateOrderDetailsRequestDTO
  ): Promise<IOrderDetailsOutRequestDTO> {
    const orderDetailsRepository = AppDataSource.getRepository(OrderDetailsDTO)
    const updatedOrderDetails = await orderDetailsRepository
      .createQueryBuilder('orderDetails')
      .update(OrderDetailsDTO)
      .set(data)
      .where('id = :id', { id: orderDetails.id })
      .returning([
        'id',
        'staff',
        'total',
        'goldToCash',
        'discount',
        'isChecked',
        'description',
        'updatedAt',
      ])
      .updateEntity(true)
      .execute()
    return updatedOrderDetails.raw[0]
  }

  /**
   * Deletes a order by ID.
   * @async
   * @param {string} id - The ID of the order to delete.
   * @returns {Promise<void>} The promise that resolves when the order is deleted.
   */
  async delete(id: string): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await queryRunner.manager.delete(OrderSaleDTO, {
        orderDetails: { id: id },
      })

      await queryRunner.manager.delete(OrderExchangeDTO, {
        orderDetails: { id: id },
      })

      await queryRunner.manager.delete(OrderDetailsDTO, { id: id })
      await queryRunner.commitTransaction()
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw e
    } finally {
      await queryRunner.release()
    }
  }

  /**
   * Finds a order by ID.
   * @async
   * @param {string} id - The ID of the order to find.
   * @returns {Promise<IOrderDetailsInRequestDTO|unknown>} The found order or undefined.
   */
  async findById(id: string): Promise<IOrderDetailsInRequestDTO | unknown> {
    const orderDetailsRepository = AppDataSource.getRepository(OrderDetailsDTO)
    const orderDetails = await orderDetailsRepository.findOneBy({
      id: id,
    })
    return orderDetails
  }

  /**
   * Finds a remain order by staff ID.
   * @async
   * @param {number} staff_id - The staff ID of the order to find.
   * @returns {Promise<IOrderDetailsInRequestDTO|unknown>} The found order or undefined.
   */
  async findByStaffId(
    staff_id: number
  ): Promise<IOrderDetailsInRequestDTO | unknown> {
    const orderDetailsRepository = AppDataSource.getRepository(OrderDetailsDTO)
    const orderDetails = await orderDetailsRepository.findOneBy({
      staff: { id: staff_id },
      isChecked: false,
    })
    return orderDetails
  }

  /**
   * Retrieves the paginated list of orders.
   * @async
   * @param {number} staff_id - The staff ID of the order to find.
   * @returns {Promise<PaginationDTO>} The paginated list of orders.
   */
  async findCheckedOrders(staff_id: number): Promise<PaginationDTO> {
    const perPage = 100

    const orderDetailsRepository = AppDataSource.getRepository(OrderDetailsDTO)
    const [orders, total] = await orderDetailsRepository.findAndCount({
      where: {
        staff: staff_id != -1 ? { id: staff_id } : {},
        isChecked: true,
      },
      take: perPage,
      skip: 0,
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        isChecked: true,
      },
    })

    return {
      body: orders,
      total: total,
      page: 1,
      last_page: Math.ceil(total / perPage),
    }
  }

  /**
   * Retrieves the paginated list of orders.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of orders.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4

    const orderDetailsRepository = AppDataSource.getRepository(OrderDetailsDTO)
    const [orders, total] = await orderDetailsRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        staff: {
          id: true,
          firstName: true,
          lastName: true,
        },
        total: true,
        goldToCash: true,
        discount: true,
        isChecked: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      body: orders,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
