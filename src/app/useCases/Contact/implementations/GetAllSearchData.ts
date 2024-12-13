import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ContactErrorType } from '../../../../domain/enums/contact/ErrorType'
import { IContactRepository } from '../../../repositories/Contact'
import { IGetAllSearchDataUseCase } from '../GetAllSearchData'

/**
 * Use case for retrieving all search data.
 * @class
 * @implements {IGetAllSearchDataUseCase}
 */
export class GetAllSearchDataUseCase implements IGetAllSearchDataUseCase {
  /**
   * Creates an instance of GetAllSearchDataUseCase.
   * @constructor
   * @param {IContactRepository} contactRepository - The repository for contact data.
   */
  constructor(private contactRepository: IContactRepository) {}

  /**
   * Executes the retrieve all search data use case.
   * @async
   * @returns {ResponseDTO} The response data.
   */
  async execute(): Promise<ResponseDTO> {
    try {
      const contacts = await this.contactRepository.findAllSearchData()

      if (contacts.length == 0) {
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
