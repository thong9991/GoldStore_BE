/**
 * Data Transfer Object (DTO) representing user authentication data.
 * @interface
 */
export interface IAuthenticateUserDTO {
  /**
   * The username of the user for authentication.
   */
  username: string

  /**
   * The password of the user for authentication.
   */
  password: string
}
