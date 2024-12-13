/**
 * Enumeration of representing error types related to user operations.
 * @enum
 */
export enum UserErrorType {
  /**
   * Error type indicating that the user already exists.
   */
  UserAlreadyExists = 'Người dùng đã tồn tại',

  /**
   * Error type indicating that the user does not exist.
   */
  UserNotExist = 'Người dùng không tồn tại',

  /**
   * Error type indicating that no users were found.
   */
  UserNotFound = 'Không tìm thấy người dùng',

  /**
   * Error type indicating that no users were found.
   */
  PasswordLengthTooShort = 'Mật khẩu phải dài hơn 8 ký tự',
}
