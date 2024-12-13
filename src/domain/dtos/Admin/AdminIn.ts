/**
 * Data Transfer Object (DTO) representing the input of admin data.
 * @interface
 */
export interface IAdminInRequestDTO {
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
   * The password of the admin.
   */
  password: string

  /**
   * The optional created date of admin account.
   */
  createdAt?: Date

  /**
   * The optional updated date of admin account.
   */
  updatedAt?: Date
}
