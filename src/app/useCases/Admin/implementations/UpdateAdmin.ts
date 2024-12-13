import { AdminDTO } from '../../../../domain/dtos/Admin/Admin'
import { IUpdateAdminRequestDTO } from '../../../../domain/dtos/Admin/UpdateAdmin'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { AdminEntity } from '../../../../domain/entities/Admin'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IAdminRepository } from '../../../repositories/Admin'
import { IUpdateAdminUseCase } from '../UpdateAdmin'

/**
 * Use case for updating admin information.
 * @class
 * @implements {IUpdateAdminUseCase}
 */
export class UpdateAdminUseCase implements IUpdateAdminUseCase {
  /**
   * Creates an instance of UpdateAdminUseCase.
   * @constructor
   * @param {IAdminRepository} adminRepository - The repository for the admins data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private adminRepository: IAdminRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  /**
   * Executes the update admin use case.
   * @async
   * @param {number} adminId - The ID of the admin to be updated.
   * @param {IUpdateAdminRequestDTO} requestData - The updated admin information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    adminId: number,
    { email, username, password }: IUpdateAdminRequestDTO
  ): Promise<ResponseDTO> {
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

      if (password) {
        password = await this.passwordHasher.hashPassword(password)
      }

      const adminEntity = AdminEntity.update({
        email,
        username,
        password,
      })
      const admin = await this.adminRepository.update(adminExist, adminEntity)

      return { data: admin, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
