/**
 * Enumeration of representing error types related to staff operations.
 * @enum
 */
export enum RelativeErrorType {
  /**
   * Error type indicating that the staff already exists.
   */
  RelativeAlreadyExists = 'Thông tin người nhà đã tồn tại',

  /**
   * Error type indicating that the staff does not exist.
   */
  RelativeNotExist = 'Thông tin người nhà không tồn tại',

  /**
   * Error type indicating that no staffs were found.
   */
  RelativeNotFound = 'Không tìm thấy người thân',
}
