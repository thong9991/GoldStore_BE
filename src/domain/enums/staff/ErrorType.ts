/**
 * Enumeration of representing error types related to staff operations.
 * @enum
 */
export enum StaffErrorType {
  /**
   * Error type indicating that the staff already exists.
   */
  StaffAlreadyExists = 'Nhân viên đã tồn tại',

  /**
   * Error type indicating that the staff does not exist.
   */
  StaffNotExist = 'Nhân viên không tồn tại',

  /**
   * Error type indicating that no staffs were found.
   */
  StaffNotFound = 'Không tìm thấy nhân viên',

  /**
   * Error type indicating that the staff has unchecked orders.
   */
  OrderConstraint = 'Nhân viên này đang có một số đơn hàng chưa được kiểm tra',
}
