/**
 * Data Transfer Object (DTO) representing the output of admin data.
 * @interface
 */
export interface IAdminOutRequestDTO {
  /**
   * The ID of the admin.
   */
  id: number

  /**
   * The email of the admin.
   */
  email: string

  /**
   * The username of the admin.
   */
  username: string

  /**
   * The optional created date of admin account.
   */
  createdAt?: Date

  /**
   * The optional updated date of admin account.
   */
  updatedAt?: Date
}
