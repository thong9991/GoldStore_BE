/**
 * Enumeration of representing error types related to cash drawer operations.
 * @enum
 */
export enum CashDrawerErrorType {
  /**
   * Error type indicating that the cash drawer does not exist.
   */
  CashDrawerNotExist = 'Tủ thu ngân không tồn tại',

  /**
   * Error type indicating that no cash drawers were found.
   */
  CashDrawerNotFound = 'Không tìm thấy tủ thu ngân',

  /**
   * Error type indicating that the cash drawer is being used for assets.
   */
  AssetConstraint = 'Thông tin tủ thu ngân này đang được sử dụng để lưu trữ tài sản',
}
