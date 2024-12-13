import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a relative.
 * @interface
 */
export interface IDeleteRelativeUseCase {
  /**
   * Executes the delete relative use case.
   * @async
   * @param {number} relativeId - The ID of the relative to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(relativeId: number): Promise<ResponseDTO>
}
