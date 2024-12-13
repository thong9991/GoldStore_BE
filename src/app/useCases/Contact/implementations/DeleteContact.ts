import { ContactDTO } from '../../../../domain/dtos/Contact/Contact'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'
import { AuthenticateUserErrorType } from '../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { ContactErrorType } from '../../../../domain/enums/contact/ErrorType'
import { ContactSuccessType } from '../../../../domain/enums/contact/SuccessType'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IContactRepository } from '../../../repositories/Contact'
import { IRelativeRepository } from '../../../repositories/Relative'
import { IUserRepository } from '../../../repositories/User'
import { IDeleteContactUseCase } from '../DeleteContact'

/**
 * Use case for deleting contact.
 * @class
 * @implements {IDeleteContactUseCase}
 */
export class DeleteContactUseCase implements IDeleteContactUseCase {
  /**
   * Creating an instance of DeleteContactUseCase.
   * @constructor
   * @param {IContactRepository} contactRepository - The repository for the contacts data.
   * @param {IRelativeRepository} relativeRepository - The repository for the relatives data.
   * @param {IUserRepository} userRepository - The repository for the users data.
   */
  constructor(
    private contactRepository: IContactRepository,
    private relativeRepository: IRelativeRepository,
    private userRepository: IUserRepository
  ) {}

  /**
   * Executes the delete contact use case.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} contactId - The ID of the contact to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(userId: number, contactId: number): Promise<ResponseDTO> {
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

      const relativeExist =
        await this.relativeRepository.findByContactId(contactId)
      if (relativeExist) {
        return {
          data: { error: ContactErrorType.RelativeConstraint },
          success: false,
        }
      }

      await this.contactRepository.delete(contactId)

      return { data: { msg: ContactSuccessType.ContactDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
