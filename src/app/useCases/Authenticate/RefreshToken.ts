import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of refreshing the user's authentication token.
 * This interface defines the contract for a use case responsible for
 * refreshing a user's authentication token using a provided user ID and
 * bearer token.
 * @interface
 */
export interface IRefreshTokenUseCase {
  /**
   * Executes the refresh token use case.
   * @async
   * @param {number} user_id - The id of the user to refresh token.
   * @returns {Promise<Response>} The response data.
   * @remarks
   * This method responsible for handling the logic of refreshing
   * a user's authentication token based on the ID of the user and
   * bearer token.
   */
  execute(user_id: number): Promise<ResponseDTO>
}
