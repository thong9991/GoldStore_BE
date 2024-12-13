/**
 * Enumeration of representing error types related to user authentication.
 * @enum
 */
export enum AuthenticateUserErrorType {
  /**
   * Error type indicating that the provided username or password is incorrect.
   */
  UsernameOrPasswordWrong = 'Tên tài khoản hoặc mật khẩu không đúng',

  /**
   * Error type indicating that the provided password is incorrect.
   */
  PasswordWrong = 'Mật khẩu không đúng',

  /**
   * Error type indicating that user don't have permission to access system.'
   */
  AccessDenied = 'Tài khoản chưa được cấp quyên để truy cập vào hệ thống',
}
