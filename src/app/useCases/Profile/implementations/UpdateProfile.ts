import { ResponseDTO } from '../../../../domain/dtos/Response'
import { StaffDTO } from '../../../../domain/dtos/Staff/Staff'
import { IUpdateStaffRequestDTO } from '../../../../domain/dtos/Staff/UpdateStaff'
import { UserDTO } from '../../../../domain/dtos/User/User'
import { StaffEntity } from '../../../../domain/entities/Staff'
import { UserEntity } from '../../../../domain/entities/User'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IStaffRepository } from '../../../repositories/Staff'
import { IUserRepository } from '../../../repositories/User'
import { IUpdateProfileUseCase } from '../UpdateProfile'

/**
 * Use case for updating staff profile.
 * @class
 * @implements {IUpdateProfileUseCase}
 */
export class UpdateProfileUseCase implements IUpdateProfileUseCase {
  /**
   * Creates an instance of UpdateProfileUseCase.
   * @constructor
   * @param {IStaffRepository} staffRepository - The repository for the staffs data.
   * @param {IUserRepository} userRepository - The repository for the users data.
   */
  constructor(
    private staffRepository: IStaffRepository,
    private userRepository: IUserRepository
  ) {}

  /**
   * Executes the update staff use case.
   * @async
   * @param {number} userId - The ID of the user to be updated.
   * @param {IUpdateStaffRequestDTO} requestData - The updated profile information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    userId: number,
    { firstName, lastName, phone, address }: IUpdateStaffRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const staffExist = (await this.staffRepository.findByUserId(
        userId
      )) as StaffDTO | null

      if (staffExist) {
        const staffEntity = StaffEntity.update({
          firstName,
          lastName,
          phone,
          address,
        })
        const staff = await this.staffRepository.update(staffExist, staffEntity)
        return { data: staff, success: true }
      }

      const userExist = (await this.userRepository.findById(
        userId
      )) as UserDTO | null

      if (!userExist) {
        return {
          data: { error: UserErrorType.UserNotFound },
          success: false,
        }
      }

      const staffEntity = StaffEntity.create({
        firstName: firstName || '',
        lastName: lastName || '',
        phone: phone || '',
        address: address || '',
      })

      const staff = await this.staffRepository.create(staffEntity)

      const userEntity = UserEntity.update({
        ...userExist,
        staff: staff,
      })

      await this.userRepository.update(userExist, userEntity)

      return { data: staff, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
