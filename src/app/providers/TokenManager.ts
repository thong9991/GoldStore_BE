/**
 * Interface for the provider responsible for managing and validating tokens.
 * @interface
 */
export interface ITokenManagerProvider {
  /**
   * Validates the age of token based on expiration time.
   * @param {number} expired_in - The expiration time of the token in seconds.
   * @returns {boolean} A boolean value indicating whether the token is still valid based on its age.
   */
  validateTokenExpiration(expired_in: number): boolean

  /**
   * Validates the integrity and format of token.
   * @param {string} token - The provided token to be validated.
   * @param {string} user_id - The user ID of the user to be validated.
   * @param {bolean} is_admin - The boolean indicating that the user is an admin.
   * @returns {boolean} A boolean value indicating whether the token is valid.
   */
  validateToken(token: string, user_id: string, is_admin: boolean): boolean
}
