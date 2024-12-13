import { ICreateStaffRequestDTO } from '../dtos/Staff/CreateStaff'
import { IUpdateStaffRequestDTO } from '../dtos/Staff/UpdateStaff'

/**
 * Interface representing the structure of a staff.
 * @interface
 */
export interface StaffInterface {
  firstName: string
  lastName: string
  phone: string
  address: string
}

/**
 * Class representing a staff.
 * @class
 */
export class StaffEntity {
  private _firstName: string
  private _lastName: string
  private _phone: string
  private _address: string

  /**
   * Create an instance of StaffEntity.
   * @constructor
   * @param {StaffInterface} props - The properties of the staff.
   */
  constructor(props: StaffInterface) {
    this._firstName = props.firstName
    this._lastName = props.lastName
    this._phone = props.phone
    this._address = props.address
  }

  /**
   * Create a new staff instance with provided data.
   * @static
   * @param {ICreateStaffRequestDTO} data - The data to create a staff.
   * @returns {StaffEntity} The created staff instance.
   */
  static create({
    firstName,
    lastName,
    phone,
    address,
  }: ICreateStaffRequestDTO): StaffEntity {
    return new StaffEntity({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address || '',
    })
  }

  /**
   * Update the staff instance with provided data.
   * @static
   * @param {IUpdateStaffRequestDTO} updatedStaff - The data to update a staff.
   * @returns {IUpdateStaffRequestDTO} The updated staff instance.
   */
  static update(updatedStaff: IUpdateStaffRequestDTO): IUpdateStaffRequestDTO {
    return updatedStaff
  }

  /**
   * Gets the staff's firstName.
   * @readonly
   */
  get firstName(): string {
    return this._firstName
  }
  /**
   * Gets the staff's phone type.
   * @readonly
   */
  get lastName(): string {
    return this._lastName
  }

  /**
   * Gets the staff's phone number.
   * @readonly
   */
  get phone(): string {
    return this._phone
  }

  /**
   * Gets the staff's address.
   * @readonly
   */
  get address(): string {
    return this._address
  }
}
