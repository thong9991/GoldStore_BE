import { IProductRepository } from '../../../app/repositories/Product'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { ICreateProductRequestDTO } from '../../../domain/dtos/Product/CreateProduct'
import { ProductDTO } from '../../../domain/dtos/Product/Product'
import { IProductInRequestDTO } from '../../../domain/dtos/Product/ProductIn'
import { IProductOutRequestDTO } from '../../../domain/dtos/Product/ProductOut'
import { IUpdateProductRequestDTO } from '../../../domain/dtos/Product/UpdateProduct'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the product repository.
 * @class
 * @implements {IProductRepository}
 */
export class ProductRepository implements IProductRepository {
  /**
   * Creates a new product.
   * @async
   * @param {ICreateProductRequestDTO} data - The product data.
   * @returns {Promise<IProductOutRequestDTO>} The created product.
   */
  async create(data: ICreateProductRequestDTO): Promise<IProductOutRequestDTO> {
    const productRepository = AppDataSource.getRepository(ProductDTO)
    const product = productRepository.create(data)

    const date = new Date()
    product.createdAt = date
    product.updatedAt = date

    const unixTimestamp = Math.floor(date.getTime() / 1000)
    product.id = unixTimestamp

    const results = await productRepository.save(product)
    return results
  }

  /**
   * Updates a product with new data.
   * @async
   * @param {IProductOutRequestDTO} product - The product to update.
   * @param {IUpdateProductRequestDTO} data - The updated product data.
   * @returns {Promise<IProductOutRequestDTO>} The updated product.
   */
  async update(
    product: IProductOutRequestDTO,
    data: IUpdateProductRequestDTO
  ): Promise<IProductOutRequestDTO> {
    const productRepository = AppDataSource.getRepository(ProductDTO)
    const updatedProduct = await productRepository
      .createQueryBuilder('product')
      .update(ProductDTO)
      .set(data)
      .where('id = :id', { id: product.id })
      .returning([
        'id',
        'productName',
        'category',
        'goldPrice',
        'totalWeight',
        'goldWeight',
        'gemWeight',
        'wage',
        'vendor',
        'updatedAt',
      ])
      .updateEntity(true)
      .execute()
    return updatedProduct.raw[0]
  }

  /**
   * Deletes a product by ID.
   * @async
   * @param {number} id - The ID of the product to delete.
   * @returns {Promise<void>} The promise that resolves when the product is deleted.
   */
  async delete(id: number): Promise<void> {
    const productRepository = AppDataSource.getRepository(ProductDTO)
    await productRepository.delete({ id: id })
  }

  /**
   * Finds a product by ID.
   * @async
   * @param {number} id - The ID of the product to find.
   * @returns {Promise<IProductInRequestDTO|unknown>} The found product or undefined.
   */
  async findById(id: number): Promise<IProductInRequestDTO | unknown> {
    const productRepository = AppDataSource.getRepository(ProductDTO)
    const product = await productRepository.findOne({
      where: { id: id },
      select: {
        id: true,
        productName: true,
        category: true,
        goldPrice: {
          goldType: true,
        },
        totalWeight: true,
        goldWeight: true,
        gemWeight: true,
        wage: true,
        createdAt: true,
        updatedAt: true,
      },
      relations: ['goldPrice'],
    })
    return product
  }

  /**
   * Finds a product by gold type.
   * @async
   * @param {string} goldType - The gold type of the product to find.
   * @returns {Promise<IProductInRequestDTO|unknown>} The found product or undefined.
   */
  async findByGoldType(
    goldType: string
  ): Promise<IProductInRequestDTO | unknown> {
    const productRepository = AppDataSource.getRepository(ProductDTO)
    const product = await productRepository.findOneBy({
      goldPrice: { goldType: goldType },
    })
    return product
  }

  /**
   * Finds a product by vendor ID.
   * @async
   * @param {number} vendor_id - The vendor ID of the product to find.
   * @returns {Promise<IProductInRequestDTO|unknown>} The found product or undefined.
   */
  async findByVendorId(
    vendor_id: number
  ): Promise<IProductInRequestDTO | unknown> {
    const productRepository = AppDataSource.getRepository(ProductDTO)
    const product = await productRepository.findOneBy({
      vendor: { id: vendor_id },
    })
    return product
  }

  /**
   * Retrieves the paginated list of products.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of products.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 10

    const productRepository = AppDataSource.getRepository(ProductDTO)
    const [products, total] = await productRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        productName: true,
        category: true,
        goldPrice: {
          goldType: true,
        },
        totalWeight: true,
        goldWeight: true,
        gemWeight: true,
        wage: true,
        vendor: {
          id: true,
          vendorName: true,
          vendorAddress: true,
        },
        createdAt: true,
        updatedAt: true,
      },
      relations: {
        goldPrice: true,
        vendor: true,
      },
    })

    return {
      body: products,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
