import { ICreateVendorRequestDTO } from '../dtos/Vendor/CreateVendor'
import { IUpdateVendorRequestDTO } from '../dtos/Vendor/UpdateVendor'

/**
 * Interface representing the structure of a vendor.
 * @interface
 */
export interface VendorInterface {
  vendorName: string
  vendorCode: string
  vendorAddress: string
}

/**
 * Class representing a vendor.
 * @class
 */
export class VendorEntity {
  private _vendorName: string
  private _vendorCode: string
  private _vendorAddress: string

  /**
   * Create an instance of VendorEntity.
   * @constructor
   * @param {VendorInterface} props - The properties of the vendor.
   */
  constructor(props: VendorInterface) {
    this._vendorName = props.vendorName
    this._vendorCode = props.vendorCode
    this._vendorAddress = props.vendorAddress
  }

  /**
   * Create a new vendor instance with provided data.
   * @static
   * @param {ICreateVendorRequestDTO} data - The data to create a vendor.
   * @returns {VendorEntity} The created vendor instance.
   */
  static create({
    vendorName,
    vendorCode,
    vendorAddress,
  }: ICreateVendorRequestDTO): VendorEntity {
    return new VendorEntity({
      vendorName: vendorName,
      vendorCode: vendorCode,
      vendorAddress: vendorAddress,
    })
  }

  /**
   * Update the vendor instance with provided data.
   * @static
   * @param {IUpdateVendorRequestDTO} updatedVendor - The data to update a vendor.
   * @returns {IUpdateVendorRequestDTO} The updated vendor instance.
   */
  static update(
    updatedVendor: IUpdateVendorRequestDTO
  ): IUpdateVendorRequestDTO {
    return updatedVendor
  }

  /**
   * Gets the vendor's name.
   * @readonly
   */
  get vendorName(): string {
    return this._vendorName
  }

  /**
   * Gets the vendor's code.
   * @readonly
   */
  get vendorCode(): string {
    return this._vendorCode
  }

  /**
   * Gets the vendor's address.
   * @readonly
   */
  get vendorAddress(): string {
    return this._vendorAddress
  }
}
