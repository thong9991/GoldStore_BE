/**
 * Data Transfer Object (DTO) representing the request to update a vendor.
 * @interface
 */
export interface IUpdateVendorRequestDTO {
  /**
   * The updated ID of the vendor.
   */
  id?: number

  /**
   * The updated name of the vendor.
   */
  vendorName?: string

  /**
   * The updated code of the vendor.
   */
  vendorCode: string

  /**
   * The updated address of the vendor.
   */
  vendorAddress?: string
}
