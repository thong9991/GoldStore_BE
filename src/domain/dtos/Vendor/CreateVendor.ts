/**
 * Data Transfer Object (DTO) representing the request to create a vendor.
 * @interface
 */
export interface ICreateVendorRequestDTO {
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
}
