import { IAuthenticateUserDTO } from '../../../domain/dtos/Authenticate/AuthenticateUser'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of authenticating a user.
 * This interface defines the contract for a use case responsible for
 * authenticating a user based on the provided credentials.
 * @interface
 */
export interface IAuthenticateAdminUseCase {
  /**
   * Executes the authenticate user use case.
   * @async
   * @param {IAuthenticateUserDTO} credentials - The user's credentials for authenticating.
   * @returns {Promise<ResponseDTO>} The response data.
   * @remarks
   * This method is responsible for handling the logic of authenticating
   * a user based on the provided credentials (username and password).
   */
  execute({ username, password }: IAuthenticateUserDTO): Promise<ResponseDTO>
}
