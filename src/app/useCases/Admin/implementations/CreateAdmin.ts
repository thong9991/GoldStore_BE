import { AdminDTO } from '../../../../domain/dtos/Admin/Admin'
import { ICreateAdminRequestDTO } from '../../../../domain/dtos/Admin/CreateAdmin'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { AdminEntity } from '../../../../domain/entities/Admin'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IAdminRepository } from '../../../repositories/Admin'
import { ICreateAdminUseCase } from '../CreateAdmin'

/**
 * Use case for creating a new admin.
 * @class
 * @implements {ICreateAdminUseCase}
 */
export class CreateAdminUseCase implements ICreateAdminUseCase {
  /**
   * Creates an instance of CreateAdminUseCase.
   * @constructor
   * @param {IAdminRepository} adminRepository - The repository for the admins data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private adminRepository: IAdminRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  /**
   * Executes the create admin use case.
   * @async
   * @param {ICreateAdminRequestDTO} data - The creating admin request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    email,
    username,
    password,
  }: ICreateAdminRequestDTO): Promise<ResponseDTO> {
    try {
      const adminExist = (await this.adminRepository.findByUsername(
        username
      )) as AdminDTO | null

      if (adminExist) {
        return {
          data: { error: UserErrorType.UserAlreadyExists },
          success: false,
        }
      }

      const hashedPassword = await this.passwordHasher.hashPassword(password)

      const adminEntity = AdminEntity.create({
        email,
        username,
        password: hashedPassword,
      })

      const admin = await this.adminRepository.create(adminEntity)

      return { data: admin, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
