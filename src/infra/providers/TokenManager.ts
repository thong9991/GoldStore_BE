import dayjs from 'dayjs'
import * as dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'
import { ITokenManagerProvider } from '../../app/providers/TokenManager'

dotenv.config()

/**
 * Implementation of the token manager provider.
 * @class
 * @implements {ITokenManagerProvider}
 */
export class TokenManager implements ITokenManagerProvider {
  /**
   * Validates whether the token is still valid based on the provided expiration timestamp.
   * @param {number} expired_in - The expiration timestamp of the token.
   * @returns {boolean} True if the token is expired, false otherwise.
   */
  validateTokenExpiration(expired_in: number): boolean {
    return dayjs().isAfter(dayjs.unix(expired_in))
  }

  /**
   * Validates the authenticity and integrity of a given token using the API secret.
   * @param {string} token - The provided token.
   * @param {string} user_id - The id of the user.
   * @param {bolean} is_admin - The boolean indicating that the user is an admin.
   * @returns {boolean} True if the token is valid, false otherwise.
   */
  validateToken(token: string, user_id: string, is_admin: boolean): boolean {
    try {
      const payload = verify(token, process.env.API_SECRET || '')
      if (!payload || !payload.sub) {
        return false
      }

      const payloadSub = payload.sub as string
      const splited = payloadSub.split('-')

      if (is_admin && splited.length < 2) {
        return false
      }

      if (is_admin) {
        return (
          splited[0] == 'admin' &&
          (user_id == '0' || `-${splited[1]}` == user_id)
        )
      }

      return user_id == '0' || splited[0] == user_id
    } catch (error: any) {
      return false
    }
  }
}
