import { IRefreshTokenDTO } from '../../domain/dtos/Authenticate/RefreshToken'

/**
 * Interface for the repository handling refresh tokens.
 * @interface
 */
export interface IRefreshTokenRepository {
  /**
   * Create a new refresh token for the specified user.
   * @async
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<IRefreshTokenDTO>} The created refresh token.
   */
  create(user_id: number): Promise<IRefreshTokenDTO>

  /**
   * Delete a refresh token associated with the specified user.
   * @async
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<void>} The promise resolves when a refresh token is deleted.
   */
  delete(user_id: number): Promise<void>

  /**
   * Finds refresh tokens by its identifier.
   * @async
   * @param {string} refreshToken - The refresh token identifier.
   * @returns {Promise<IRefreshTokenDTO|unknown>} The found refresh token, or unidentified if not found.
   */
  findById(refreshToken: string): Promise<IRefreshTokenDTO | unknown>

  /**
   * Finds refresh token by the user's ID.
   * @async
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<IRefreshTokenDTO|unknown>} The found refresh token, or unidentified if not found.
   */
  findByUserId(user_id: number): Promise<IRefreshTokenDTO | unknown>
}
