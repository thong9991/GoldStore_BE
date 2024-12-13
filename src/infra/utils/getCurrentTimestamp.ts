import { verify } from 'jsonwebtoken'

/**
 * Get current timestamp.
 * @returns {Date} Current timestamp
 */
export function getCurrentTimestamp(): Date {
  const date = new Date()
  const userTimezoneOffset = date.getTimezoneOffset() * 60000
  const currentTimeStamp = new Date(
    date.getTime() + userTimezoneOffset
  ).setMilliseconds(0)
  return new Date(currentTimeStamp)
}
