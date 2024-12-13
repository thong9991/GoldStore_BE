import { ResponseDTO } from '../../../../domain/dtos/Response'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IStaffRepository } from '../../../repositories/Staff'
import { IGetProfileUseCase } from '../GetProfile'

/**
 * Use case for searching staff profile.
 * @class
 * @implements {IGetProfileUseCase}
 */
export class GetProfileUseCase implements IGetProfileUseCase {
  /**
   * Creates an instance of GetProfileUseCase.
   * @constructor
   * @param {IStaffRepository} staffRepository - The repository for staffs data.
   */
  constructor(private staffRepository: IStaffRepository) {}

  /**
   * Executes the search staff profile use case.
   * @async
   * @param {number} userId - The ID of user to search for.
   * @returns {ResponseDTO} The response data.
   */
  async execute(userId: number): Promise<ResponseDTO> {
    try {
      const staff = await this.staffRepository.findByUserId(userId)

      if (!staff) {
        return { data: { error: UserErrorType.UserNotExist }, success: false }
      }

      return { data: staff, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
