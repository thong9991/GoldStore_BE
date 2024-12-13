import * as dotenv from 'dotenv'
import { sign } from 'jsonwebtoken'
import { IGenerateRefreshTokenProvider } from '../../app/providers/GenerateRefreshToken'

dotenv.config()

/**
 * Implements the refresh token provider.
 * @class
 * @implements {IGenerateRefreshTokenProvider}
 */
export class GenerateRefreshToken implements IGenerateRefreshTokenProvider {
  /**
   * Generates a new refresh token based on provided token.
   * @async
   * @param {string} token - The provided token.
   * @param {boolean} isAdmin - A boolean value indicating that the user is an admin.
   * @returns {Promise<string>} The generated refresh token.
   * @throws {Error} Throws an error if the API_SECRET is missing in the environment variables.
   */
  async generateToken(token: string, isAdmin: boolean): Promise<string> {
    const secretKey = process.env.API_SECRET
    if (!secretKey) {
      throw new Error('API_SECRET is missing in the environment variables.')
    }

    const generatedToken = sign({}, secretKey, {
      subject: isAdmin ? `admin-${token}` : token,
      expiresIn: isAdmin ? '30m' : '1h',
    })
    return generatedToken
  }
}
