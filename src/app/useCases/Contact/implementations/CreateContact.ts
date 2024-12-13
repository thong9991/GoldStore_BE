import { ICreateContactRequestDTO } from '../../../../domain/dtos/Contact/CreateContact'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ContactEntity } from '../../../../domain/entities/Contact'
import { IContactRepository } from '../../../repositories/Contact'
import { ICreateContactUseCase } from '../CreateContact'

/**
 * Use case for creating a new contact.
 * @class
 * @implements {ICreateContactUseCase}
 */
export class CreateContactUseCase implements ICreateContactUseCase {
  /**
   * Creates an instance of CreateContactUseCase.
   * @constructor
   * @param {IContactRepository} contactRepository - The repository for the contacts data.
   */
  constructor(private contactRepository: IContactRepository) {}

  /**
   * Executes the create contact use case.
   * @async
   * @param {ICreateContactRequestDTO} data - The creating contact request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    name,
    phoneType,
    phone,
    description,
  }: ICreateContactRequestDTO): Promise<ResponseDTO> {
    try {
      const contactEntity = ContactEntity.create({
        name,
        phoneType,
        phone,
        description,
      })

      const contact = await this.contactRepository.create(contactEntity)

      return { data: contact, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
