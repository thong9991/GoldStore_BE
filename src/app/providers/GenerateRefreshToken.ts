/**
 * Interface for the provider responsible for generating refresh token.
 * @interface
 */
export interface IGenerateRefreshTokenProvider {
  /**
   * Generates refresh token based on the provided token.
   * @async
   * @param {string} token - Token used as basis for generating the refresh token.
   * @param {boolean} isAdmin - A boolean value indicating that the user is an admin.
   * @returns {Promise<string>} The generated refresh token.
   */
  generateToken(token: string, isAdmin: boolean): Promise<string>
}
