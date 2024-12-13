import { IUpdateRelativeRequestDTO } from '../../../domain/dtos/Relative/UpdateRelative'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating relative information.
 * @interface
 */
export interface IUpdateRelativeUseCase {
  /**
   * Executes the update relative use case.
   * @async
   * @param {number} relativeId - The ID of the relative to be updated.
   * @param {IUpdateRelativeRequestDTO} data - The data for updating relative information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    relativeId: number,
    data: IUpdateRelativeRequestDTO
  ): Promise<ResponseDTO>
}
