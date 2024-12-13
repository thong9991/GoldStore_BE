import { ResponseDTO } from '../../../domain/dtos/Response'
import { ICreateStaffRequestDTO } from '../../../domain/dtos/Staff/CreateStaff'

/**
 * Interface for the use case of creating a new staff.
 * @interface
 */
export interface ICreateStaffUseCase {
  /**
   * Executes the create staff use case.
   * @async
   * @param {ICreateStaffRequestDTO} data - The data for creating a new staff.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateStaffRequestDTO): Promise<ResponseDTO>
}
