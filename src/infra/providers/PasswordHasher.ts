import * as bcrypt from 'bcryptjs'
import { IPasswordHasher } from '../../app/providers/PasswordHasher'
/**
 * Implementation of the password hashing using bcrypt.
 * @class
 * @implements {IPasswordHasher}
 */
export class PasswordHasher implements IPasswordHasher {
  private readonly saltRounds: number

  /**
   * Creates an instance of the PasswordHasher.
   * @constructor
   * @param {number} [saltRounds=10] - The number of salt rounds to use for the password hashing.
   */
  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds
  }

  /**
   * Hashes the given password using bcrypt.
   * @async
   * @param {string} password - The password to hash.
   * @returns {Promise<string>} The hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }

  /**
   * Compares the plain text password with hashed password.
   * @async
   * @param {string} password - The plain text password.
   * @param {string} hashedPassword - The hashed password.
   * @returns {Promise<boolean>} True if the passwords match, false otherwise.
   */
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }
}
