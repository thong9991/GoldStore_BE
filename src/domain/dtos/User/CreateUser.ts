/**
 * Data Transfer Object (DTO) representing the request to create a user.
 * @interface
 */
export interface ICreateUserRequestDTO {
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
   * The password of the user.
   */
  password: string
}
