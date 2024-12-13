/**
 * Interface for provider responsible for hashing and comparing password.
 * @interface
 */
export interface IPasswordHasher {
  /**
   * Hashes the provided password.
   * @async
   * @param {string} password - The password to be hashed.
   * @returns {Promise<string>} The hashed password.
   */
  hashPassword(password: string): Promise<string>

  /**
   * Compares the provided password with hashed password.
   * @async
   * @param {string} password - The provided password.
   * @param {string} hashedPassword - The hashed password.
   * @returns {boolean} A boolean value indicating whether the password is matches.
   */
  comparePassword(password: string, hashedPassword: string): Promise<boolean>
}
