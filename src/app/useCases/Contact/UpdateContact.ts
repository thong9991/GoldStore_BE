import { IUpdateContactRequestDTO } from '../../../domain/dtos/Contact/UpdateContact'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating contact information.
 * @interface
 */
export interface IUpdateContactUseCase {
  /**
   * Executes the update contact use case.
   * @async
   * @param {number} userId = The ID of the user.
   * @param {number} contactId - The ID of the contact to be updated.
   * @param {IUpdateContactRequestDTO} data - The data for updating contact information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    userId: number,
    contactId: number,
    data: IUpdateContactRequestDTO
  ): Promise<ResponseDTO>
}
