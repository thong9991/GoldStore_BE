import { ICreateContactRequestDTO } from '../../../domain/dtos/Contact/CreateContact'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of creating a new contact.
 * @interface
 */
export interface ICreateContactUseCase {
  /**
   * Executes the create contact use case.
   * @async
   * @param {ICreateContactRequestDTO} data - The data for creating a new contact.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateContactRequestDTO): Promise<ResponseDTO>
}
