import { ICreateGoldPriceRequestDTO } from '../../domain/dtos/GoldPrice/CreateGoldPrice'
import { IGoldPriceInRequestDTO } from '../../domain/dtos/GoldPrice/GoldPriceIn'
import { IGoldPriceOutRequestDTO } from '../../domain/dtos/GoldPrice/GoldPriceOut'
import { IUpdateGoldPriceRequestDTO } from '../../domain/dtos/GoldPrice/UpdateGoldPrice'
import { PaginationDTO } from '../../domain/dtos/Pagination'

/**
 * Interface for the repository handling the gold price data.
 * @interface
 */
export interface IGoldPriceRepository {
  /**
   * Creates a new gold price with the provided data.
   * @async
   * @param {ICreateGoldPriceRequestDTO} data - The gold price data to be created.
   * @returns {Promise<IGoldPriceOutRequestDTO>} The created gold price data.
   */
  create(data: ICreateGoldPriceRequestDTO): Promise<IGoldPriceOutRequestDTO>

  /**
   * Updates the gold price data with the provided information.
   * @async
   * @param {IGoldPriceOutRequestDTO} goldPrice - The gold price data to be updated.
   * @param {IUpdateGoldPriceRequestDTO} data - The updated gold price data.
   * @returns {Promise<IGoldPriceOutRequestDTO>} The updated gold price data.
   */
  update(
    goldPrice: IGoldPriceOutRequestDTO,
    data: IUpdateGoldPriceRequestDTO
  ): Promise<IGoldPriceOutRequestDTO>

  /**
   * Deletes the gold price by its type.
   * @async
   * @param {string} goldType - The type of the gold price to be deleted.
   * @returns {Promise<void>} A promise resolves when the gold price is deleted.
   */
  delete(goldType: string): Promise<void>

  /**
   * Finds the gold price by its name.
   * @async
   * @param {string} goldType - The type of the gold price.
   * @returns {Promise<IUserInRequestDTO|unknown>} The found gold price data, or unidentified if not found.
   */
  findByGoldType(goldType: string): Promise<IGoldPriceInRequestDTO | unknown>

  /**
   * Retrieves the list of gold Type data.
   * @async
   * @returns {Promise<IGoldPriceInRequestDTO>} The all gold type list.
   */
  findAllDataNoPaging(): Promise<IGoldPriceInRequestDTO[]>

  /**
   * Retrieves the paginated list of gold prices.
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated gold price list.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>
}
