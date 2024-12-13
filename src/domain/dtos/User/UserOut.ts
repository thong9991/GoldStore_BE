/**
 * Data Transfer Object (DTO) representing the output of user data.
 * @interface
 */
export interface IUserOutRequestDTO {
  /**
   * The ID of the user.
   */
  id: number

  /**
   * The role of the user.
   */
  role: string

  /**
   * The email of the user.
   */
  email: string

  /**
   * The username of the user.
   */
  username: string

  /**
   * The optional created date of user account.
   */
  createdAt?: Date

  /**
   * The optional updated date of user account.
   */
  updatedAt?: Date
}
