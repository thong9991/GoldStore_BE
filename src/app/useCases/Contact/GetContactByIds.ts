import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all contact in ID list.
 * @interface
 */
export interface IGetContactByIdsUseCase {
  /**
   * Executes the get all contact in ID list use case.
   * @async
   * @param {number[]} idList - The ID list to search for.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(idList: number[]): Promise<ResponseDTO>
}
