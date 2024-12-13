import { ContactDTO } from '../../../../domain/dtos/Contact/Contact'
import { IUpdateContactRequestDTO } from '../../../../domain/dtos/Contact/UpdateContact'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'
import { ContactEntity } from '../../../../domain/entities/Contact'
import { AuthenticateUserErrorType } from '../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { ContactErrorType } from '../../../../domain/enums/contact/ErrorType'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IContactRepository } from '../../../repositories/Contact'
import { IUserRepository } from '../../../repositories/User'
import { IUpdateContactUseCase } from '../UpdateContact'

/**
 * Use case for updating contact information.
 * @class
 * @implements {IUpdateContactUseCase}
 */
export class UpdateContactUseCase implements IUpdateContactUseCase {
  /**
   * Creates an instance of UpdateContactUseCase.
   * @constructor
   * @param {IContactRepository} contactRepository - The repository for the contacts data.
   * @param {IUserRepository} userRepository - The repository for the users data.
   */
  constructor(
    private contactRepository: IContactRepository,
    private userRepository: IUserRepository
  ) {}

  /**
   * Executes the update contact use case.
   * @async
   * @param {number} userId = The ID of the user.
   * @param {number} contactId - The ID of the contact to be updated.
   * @param {IUpdateContactRequestDTO} requestData - The updated contact information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    userId: number,
    contactId: number,
    { name, phoneType, phone, description }: IUpdateContactRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findById(
        userId
      )) as IUserInRequestDTO | null

      if (!user) {
        return { data: { error: UserErrorType.UserNotExist }, success: false }
      }
      if (user.role != 'manager') {
        return {
          data: { error: AuthenticateUserErrorType.AccessDenied },
          success: false,
        }
      }

      const contactExist = (await this.contactRepository.findById(
        contactId
      )) as ContactDTO | null

      if (!contactExist) {
        return {
          data: { error: ContactErrorType.ContactNotExist },
          success: false,
        }
      }

      const contactEntity = ContactEntity.update({
        name,
        phoneType,
        phone,
        description,
      })
      const contact = await this.contactRepository.update(
        contactExist,
        contactEntity
      )

      return { data: contact, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
