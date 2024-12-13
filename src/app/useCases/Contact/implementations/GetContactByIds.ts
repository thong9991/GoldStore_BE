import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ContactErrorType } from '../../../../domain/enums/contact/ErrorType'
import { IContactRepository } from '../../../repositories/Contact'
import { IGetContactByIdsUseCase } from '../GetContactByIds'

/**
 * Use case for retrieving all contacts in ID list.
 * @class
 * @implements {IGetContactByIdsUseCase}
 */
export class GetContactByIdsUseCase implements IGetContactByIdsUseCase {
  /**
   * Creates an instance of GetContactByIdsUseCase.
   * @constructor
   * @param {IContactRepository} contactRepository - The repository for contact data.
   */
  constructor(private contactRepository: IContactRepository) {}

  /**
   * Executes the retrieve all contacts in ID List use case.
   * @async
   * @param {number[]} idList - The ID list to search contacts.
   * @returns {ResponseDTO} The response data.
   */
  async execute(idList: number[]): Promise<ResponseDTO> {
    try {
      const contacts = await this.contactRepository.findByIds(idList)

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
