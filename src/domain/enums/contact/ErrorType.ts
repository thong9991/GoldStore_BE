/**
 * Enumeration of representing error types related to contact operations.
 * @enum
 */
export enum ContactErrorType {
  /**
   * Error type indicating that the contact already exists.
   */
  ContactAlreadyExists = 'Thông tin liên hệ này đã tồn tại',

  /**
   * Error type indicating that the contact does not exist.
   */
  ContactNotExist = 'Thông tin liên hệ không tồn tại',

  /**
   * Error type indicating that no contacts were found.
   */
  ContactNotFound = 'Không tìm thấy thông tin liên hệ',

  /**
   * Error type indicating that the contact are being used for staff relative.
   */
  RelativeConstraint = 'Thông tin liên lạc này đang được sử dụng cho người thân của nhân viên ',
}
