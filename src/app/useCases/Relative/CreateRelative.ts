import { ICreateRelativeRequestDTO } from '../../../domain/dtos/Relative/CreateRelative'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new relative.
 * @interface
 */
export interface ICreateRelativeUseCase {
  /**
   * Executes the create relative use case.
   * @async
   * @param {number} userId - the ID of the user.
   * @param {ICreateRelativeRequestDTO} data - The data for creating a new relative.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: number, data: ICreateRelativeRequestDTO): Promise<ResponseDTO>
}
