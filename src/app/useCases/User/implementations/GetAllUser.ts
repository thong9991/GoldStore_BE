import { ResponseDTO } from '../../../../domain/dtos/Response'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IUserRepository } from '../../../repositories/User'
import { IGetAllUserUseCase } from '../GetAllUser'

/**
 * Use case for retrieving all users.
 * @class
 * @implements {IGetAllUserUseCase}
 */
export class GetAllUserUseCase implements IGetAllUserUseCase {
  /**
   * Creates an instance of GetAllUserUseCase.
   * @constructor
   * @param {IUserRepository} userRepository - The repository for user data.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executes the retrieve all users use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const users = await this.userRepository.findAll(page)

      if (users.total == 0) {
        return { data: { error: UserErrorType.UserNotFound }, success: false }
      }

      return { data: users, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
