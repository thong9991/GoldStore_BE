/**
 * Enumeration of representing error types related to cash flow operations.
 * @enum
 */
export enum CashFlowErrorType {
  /**
   * Error type indicating that the cash flow does not exist.
   */
  CashFlowNotExist = 'Báo cáo giao dịch không tồn tại',

  /**
   * Error type indicating that no cash flows were found.
   */
  CashFlowNotFound = 'Không tìm thấy lịch sử giao dịch',
}
