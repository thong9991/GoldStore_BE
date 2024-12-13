import { ResponseDTO } from '../../../../domain/dtos/Response'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IAdminRepository } from '../../../repositories/Admin'
import { IGetAllAdminUseCase } from '../GetAllAdmin'

/**
 * Use case for retrieving all admins.
 * @class
 * @implements {IGetAllAdminUseCase}
 */
export class GetAllAdminUseCase implements IGetAllAdminUseCase {
  /**
   * Creates an instance of GetAllAdminUseCase.
   * @constructor
   * @param {IAdminRepository} adminRepository - The repository for admin data.
   */
  constructor(private adminRepository: IAdminRepository) {}

  /**
   * Executes the retrieve all admins use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const admins = await this.adminRepository.findAll(page)

      if (admins.total == 0) {
        return { data: { error: UserErrorType.UserNotFound }, success: false }
      }

      return { data: admins, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
