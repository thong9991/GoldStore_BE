import { ICreateRelativeRequestDTO } from '../../../../domain/dtos/Relative/CreateRelative'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IStaffInRequestDTO } from '../../../../domain/dtos/Staff/StaffIn'
import { ContactEntity } from '../../../../domain/entities/Contact'
import { RelativeEntity } from '../../../../domain/entities/Relative'
import { StaffErrorType } from '../../../../domain/enums/staff/ErrorType'
import { IContactRepository } from '../../../repositories/Contact'
import { IRelativeRepository } from '../../../repositories/Relative'
import { IStaffRepository } from '../../../repositories/Staff'
import { ICreateRelativeUseCase } from '../CreateRelative'

/**
 * Use case for creating a new relative.
 * @class
 * @implements {ICreateRelativeUseCase}
 */
export class CreateRelativeUseCase implements ICreateRelativeUseCase {
  /**
   * Creates an instance of CreateRelativeUseCase.
   * @constructor
   * @param {IRelativeRepository} relativeRepository - The repository for the relatives data.
   * @param {IStaffRepository} staffRepository - The repository for staffs data.
   * @param {IContactRepository} contactRepository - The repository for contacts data.
   */
  constructor(
    private relativeRepository: IRelativeRepository,
    private staffRepository: IStaffRepository,
    private contactRepository: IContactRepository
  ) {}

  /**
   * Executes the create relative use case.
   * @async
   * @param {number} userId - The ID of the user to create relative.
   * @param {ICreateRelativeRequestDTO} data - The creating relative request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    userId: number,
    { name, relationship, contact }: ICreateRelativeRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const staffExist = (await this.staffRepository.findByUserId(
        userId
      )) as IStaffInRequestDTO | null

      if (!staffExist) {
        return {
          data: { error: StaffErrorType.StaffNotFound },
          success: false,
        }
      }

      const contactEntity = ContactEntity.create(contact)
      const savedContact = await this.contactRepository.create(contactEntity)

      const relativeEntity = RelativeEntity.create({
        contact: savedContact,
        staff: staffExist,
        name,
        relationship,
      })

      const relative = await this.relativeRepository.create(relativeEntity)

      return { data: relative, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
