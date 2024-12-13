import { ICreateAdminRequestDTO } from '../../../domain/dtos/Admin/CreateAdmin'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new admin.
 * @interface
 */
export interface ICreateAdminUseCase {
  /**
   * Executes the create admin use case.
   * @async
   * @param {ICreateAdminRequestDTO} data - The data for creating a new admin.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateAdminRequestDTO): Promise<ResponseDTO>
}
