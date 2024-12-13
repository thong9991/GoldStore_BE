import { AdminDTO } from '../../../../domain/dtos/Admin/Admin'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { UserSuccessType } from '../../../../domain/enums/user/SuccessType'
import { IAdminRepository } from '../../../repositories/Admin'
import { IDeleteAdminUseCase } from '../DeleteAdmin'

/**
 * Use case for deleting admin.
 * @class
 * @implements {IDeleteAdminUseCase}
 */
export class DeleteAdminUseCase implements IDeleteAdminUseCase {
  /**
   * Creating an instance of DeleteAdminUseCase.
   * @constructor
   * @param {IAdminRepository} adminRepository - The repository for the admins data.
   */
  constructor(private adminRepository: IAdminRepository) {}

  /**
   * Executes the delete admin use case.
   * @async
   * @param {number} adminId - The ID of the admin to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(adminId: number): Promise<ResponseDTO> {
    try {
      const adminExist = (await this.adminRepository.findById(
        adminId
      )) as AdminDTO | null

      if (!adminExist) {
        return {
          data: { error: UserErrorType.UserNotExist },
          success: false,
        }
      }
      await this.adminRepository.delete(adminId)

      return { data: { msg: UserSuccessType.UserDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
