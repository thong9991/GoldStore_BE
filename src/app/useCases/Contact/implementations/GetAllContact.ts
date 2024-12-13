import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ContactErrorType } from '../../../../domain/enums/contact/ErrorType'
import { IContactRepository } from '../../../repositories/Contact'
import { IGetAllContactUseCase } from '../GetAllContact'

/**
 * Use case for retrieving all contacts.
 * @class
 * @implements {IGetAllContactUseCase}
 */
export class GetAllContactUseCase implements IGetAllContactUseCase {
  /**
   * Creates an instance of GetAllContactUseCase.
   * @constructor
   * @param {IContactRepository} contactRepository - The repository for contact data.
   */
  constructor(private contactRepository: IContactRepository) {}

  /**
   * Executes the retrieve all contacts use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const contacts = await this.contactRepository.findAll(page)

      if (contacts.total == 0) {
        return {
          data: { error: ContactErrorType.ContactNotFound },
          success: false,
        }
      }

      return { data: contacts, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
