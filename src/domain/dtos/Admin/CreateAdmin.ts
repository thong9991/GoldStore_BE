/**
 * Data Transfer Object (DTO) representing the request to create a admin.
 * @interface
 */
export interface ICreateAdminRequestDTO {
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
}
