/**
 * Data Transfer Object (DTO) representing the request to change user authentication information.
 * @interface
 */
export interface IUpdateAccountRequestDTO {
  /**
   * The old password of the user.
   */
  oldPassword: string

  /**
   * The new password to change password.
   */
  newPassword?: string

  /**
   * The new email to update user account.
   */
  email?: string

  /**
   * The new username to update user account.
   */
  username?: string
}
