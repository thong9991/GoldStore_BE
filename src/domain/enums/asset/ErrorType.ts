/**
 * Enumeration of representing error types related to asset operations.
 * @enum
 */
export enum AssetErrorType {
  /**
   * Error type indicating that the asset already exists.
   */
  AssetAlreadyExists = 'Thông tin tài sản đã tồn tại',

  /**
   * Error type indicating that the asset does not exist.
   */
  AssetNotExist = 'Thông tin tài sản không tồn tại',

  /**
   * Error type indicating that no assets were found.
   */
  AssetNotFound = 'Không tìm thấy thông tin tài sản',

  /**
   * Error type indicating that the asset information is being used for cash flow.
   */
  CashFlowConstraint = 'Thông tin loại tài sản này đang được sử dụng cho một số bản thu chi',
}
