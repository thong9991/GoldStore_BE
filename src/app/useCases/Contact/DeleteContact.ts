import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a contact.
 * @interface
 */
export interface IDeleteContactUseCase {
  /**
   * Executes the delete contact use case.
   * @async
   * @param {number} userId = The ID of the user.
   * @param {number} contactId - The ID of the contact to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: number, contactId: number): Promise<ResponseDTO>
}
