import { PhoneType } from '../dtos/Contact/Contact'
import { ICreateContactRequestDTO } from '../dtos/Contact/CreateContact'
import { IUpdateContactRequestDTO } from '../dtos/Contact/UpdateContact'

/**
 * Interface representing the structure of a contact.
 * @interface
 */
export interface ContactInterface {
  name: string
  phoneType: PhoneType
  phone: string
  description: string
}

/**
 * Class representing a contact.
 * @class
 */
export class ContactEntity {
  private _name: string
  private _phoneType: PhoneType
  private _phone: string
  private _description: string

  /**
   * Create an instance of ContactEntity.
   * @constructor
   * @param {ContactInterface} props - The properties of the contact.
   */
  constructor(props: ContactInterface) {
    this._name = props.name
    this._phoneType = props.phoneType
    this._phone = props.phone
    this._description = props.description
  }

  /**
   * Create a new contact instance with provided data.
   * @static
   * @param {ICreateContactRequestDTO} data - The data to create a contact.
   * @returns {ContactEntity} The created contact instance.
   */
  static create({
    name,
    phoneType,
    phone,
    description,
  }: ICreateContactRequestDTO): ContactEntity {
    return new ContactEntity({
      name: name,
      phoneType: phoneType,
      phone: phone,
      description: description || '',
    })
  }

  /**
   * Update the contact instance with provided data.
   * @static
   * @param {IUpdateContactRequestDTO} updatedContact - The data to update a contact.
   * @returns {IUpdateContactRequestDTO} The updated contact instance.
   */
  static update(
    updatedContact: IUpdateContactRequestDTO
  ): IUpdateContactRequestDTO {
    return updatedContact
  }

  /**
   * Gets the contact's name.
   * @readonly
   */
  get name(): string {
    return this._name
  }
  /**
   * Gets the contact's phone type.
   * @readonly
   */
  get phoneType(): PhoneType {
    return this._phoneType
  }

  /**
   * Gets the contact's phone number.
   * @readonly
   */
  get phone(): string {
    return this._phone
  }

  /**
   * Gets the contact's description.
   * @readonly
   */
  get description(): string {
    return this._description
  }
}
