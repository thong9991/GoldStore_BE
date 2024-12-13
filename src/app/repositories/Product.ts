import { PaginationDTO } from '../../domain/dtos/Pagination'
import { ICreateProductRequestDTO } from '../../domain/dtos/Product/CreateProduct'
import { IUpdateProductRequestDTO } from '../../domain/dtos/Product/UpdateProduct'
import { IProductInRequestDTO } from '../../domain/dtos/Product/ProductIn'
import { IProductOutRequestDTO } from '../../domain/dtos/Product/ProductOut'

/**
 * Interface for the repository handling the product data.
 * @interface
 */
export interface IProductRepository {
  /**
   * Creates a new product with the provided data.
   * @async
   * @param {ICreateProductRequestDTO} data - The product data to be created.
   * @returns {Promise<IProductOutRequestDTO>} The created product data.
   */
  create(data: ICreateProductRequestDTO): Promise<IProductOutRequestDTO>

  /**
   * Updates the product data with the provided information.
   * @async
   * @param {IProductOutRequestDTO} product - The product data to be updated.
   * @param {IUpdateProductRequestDTO} data - The updated product data.
   * @returns {Promise<IProductOutRequestDTO>} The updated product data.
   */
  update(
    product: IProductOutRequestDTO,
    data: IUpdateProductRequestDTO
  ): Promise<IProductOutRequestDTO>

  /**
   * Deletes the product by its ID.
   * @async
   * @param {number} id - The ID of the product to be deleted.
   * @returns {Promise<void>} A promise resolves when the product is deleted.
   */
  delete(id: number): Promise<void>

  /**
   * Finds the product by its ID.
   * @async
   * @param {number} id - The ID of the product.
   * @returns {Promise<IProductInRequestDTO|unknown>} The found product data, or unidentified if not found.
   */
  findById(id: number): Promise<IProductInRequestDTO | unknown>

  /**
   * Finds the first product by its gold type.
   * @async
   * @param {string} goldType - The gold type of the product.
   * @returns {Promise<IProductInRequestDTO|unknown>} The found product data, or unidentified if not found.
   */
  findByGoldType(goldType: string): Promise<IProductInRequestDTO | unknown>

  /**
   * Finds the first product by its vendor ID.
   * @async
   * @param {number} vendor_id - The vendor ID of the product.
   * @returns {Promise<IProductInRequestDTO|unknown>} The found product data, or unidentified if not found.
   */
  findByVendorId(vendor_id: number): Promise<IProductInRequestDTO | unknown>

  /**
   * Retrieves the paginated list of products.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated product list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
