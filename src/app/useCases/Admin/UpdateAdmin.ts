import { IUpdateAdminRequestDTO } from '../../../domain/dtos/Admin/UpdateAdmin'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating admin information.
 * @interface
 */
export interface IUpdateAdminUseCase {
  /**
   * Executes the update admin use case.
   * @async
   * @param {number} adminId - The ID of the admin to be updated.
   * @param {IUpdateAdminRequestDTO} data - The data for updating admin information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(adminId: number, data: IUpdateAdminRequestDTO): Promise<ResponseDTO>
}
