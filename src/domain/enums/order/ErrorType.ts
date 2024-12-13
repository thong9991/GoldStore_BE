/**
 * Enumeration of representing error types related to order operations.
 * @enum
 */
export enum OrderErrorType {
  /**
   * Error type indicating that the order does not exist.
   */
  OrderNotExist = 'Đơn hàng không tồn tại',

  /**
   * Error type indicating that no orders were found.
   */
  OrderNotFound = 'Không tìm thấy đơn hàng',

  /**
   * Error type indicating that the order is invalid.
   */
  InvalidOrderDetails = 'Đơn hàng không hợp lệ',
}
