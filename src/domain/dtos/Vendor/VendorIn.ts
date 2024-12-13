/**
 * Data Transfer Object (DTO) representing the input of vendor data.
 * @interface
 */
export interface IVendorInRequestDTO {
  /**
   * The ID of the vendor.
   */
  id: number

  /**
   * The name of the vendor.
   */
  vendorName: string

  /**
   * The code of the vendor.
   */
  vendorCode: string

  /**
   * The address of the vendor.
   */
  vendorAddress: string

  /**
   * The optional created date of the vendor.
   */
  createdAt?: Date

  /**
   * The optional updated date of the vendor.
   */
  updatedAt?: Date
}
