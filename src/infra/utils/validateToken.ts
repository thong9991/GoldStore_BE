import * as dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'

dotenv.config()

/**
 * Validates the authenticity and integrity of a given token using the API secret.
 * @param {string} token - The provided token.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
export function validateToken(token: string): boolean {
  try {
    verify(token, process.env.API_SECRET || '')
    return true
  } catch (error) {
    return false
  }
}
