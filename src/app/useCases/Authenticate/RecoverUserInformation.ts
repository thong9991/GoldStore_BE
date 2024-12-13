import { IRecoverUserInformationDTO } from '../../../domain/dtos/Authenticate/RecoverUserInformation'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of recovering a user's information.
 * This interface defines the contract for a use case responsible for
 * recovering information based on refresh token information.
 * @interface
 */
export interface IRecoverUserInformationUseCase {
  /**
   * Executes the recover user information use case.
   * @async
   * @param {IRecoverUserInformationDTO} data - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   * @remarks
   * This method is responsible for handling the logic of the recovering
   * user information based on the provided refresh token identifier.
   */
  execute({
    user_id,
    refreshTokenId,
  }: IRecoverUserInformationDTO): Promise<ResponseDTO>
}
