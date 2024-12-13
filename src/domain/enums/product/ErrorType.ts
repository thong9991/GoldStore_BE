/**
 * Enumeration of representing error types related to product operations.
 * @enum
 */
export enum ProductErrorType {
  /**
   * Error type indicating that the product does not exist.
   */
  ProductNotExist = 'Sản phẩm không tồn tại',

  /**
   * Error type indicating that no products were found.
   */
  ProductNotFound = 'Không tìm thấy sản phẩm',

  /**
   * Error type indicating that the product was sold.
   */
  SoldProduct = 'Sản phẩm này đã được bán',

  /**
   * Error type indicating that the product are being used for orders.
   */
  OrderConstraint = 'Thông tin sản phẩm này đang được sử dụng cho một số đơn hàng',
}
