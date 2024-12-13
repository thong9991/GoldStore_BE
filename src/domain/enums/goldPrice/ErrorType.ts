/**
 * Enumeration of representing error types related to gold price operations.
 * @enum
 */
export enum GoldPriceErrorType {
  /**
   * Error type indicating that the gold type already exists.
   */
  GoldPriceAlreadyExists = 'Loại vàng đã tồn tại',

  /**
   * Error type indicating that the gold type does not exist.
   */
  GoldPriceNotExist = 'Loại vàng không tồn tại',

  /**
   * Error type indicating that no gold prices were found.
   */
  GoldPriceNotFound = 'Không tìm thấy giá vàng',

  /**
   * Error type indicating that the gold prices are being used for products.
   */
  ProductConstraint = 'Giá vàng này đang được sử dụng cho một số sản phẩm',

  /**
   * Error type indicating that the gold prices are being used for order exchange.
   */
  OrderConstraint = 'Giá vàng này đang được sử dụng cho một số đơn hàng',
}
