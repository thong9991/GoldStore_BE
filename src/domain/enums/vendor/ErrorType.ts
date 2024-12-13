/**
 * Enumeration of representing error types related to vendor operations.
 * @enum
 */
export enum VendorErrorType {
  /**
   * Error type indicating that the vendor already exists.
   */
  VendorAlreadyExists = 'Nhà phân phối đã tồn tại',

  /**
   * Error type indicating that the vendor does not exist.
   */
  VendorNotExist = 'Nhà phân phối không tồn tại',

  /**
   * Error type indicating that no vendors were found.
   */
  VendorNotFound = 'Không tìm thấy nhà phân phối',

  /**
   * Error type indicating that the vendor are being used for products.
   */
  ProductConstraint = 'Thông tin nhà phân phối này đang được sử dụng cho một số sản phẩm',
}
