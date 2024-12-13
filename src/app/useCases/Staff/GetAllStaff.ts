import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all staff.
 * @interface
 */
export interface IGetAllStaffUseCase {
  /**
   * Executes the get all staff use case.
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(page: number): Promise<ResponseDTO>
}
