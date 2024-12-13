import { IContactInRequestDTO } from '../dtos/Contact/ContactIn'
import { ICreateContactRequestDTO } from '../dtos/Contact/CreateContact'
import { ICreateRelativeRequestDTO } from '../dtos/Relative/CreateRelative'
import { IUpdateRelativeRequestDTO } from '../dtos/Relative/UpdateRelative'
import { IStaffInRequestDTO } from '../dtos/Staff/StaffIn'

/**
 * Interface representing the structure of a relative.
 * @interface
 */
export interface RelativeInterface {
  staff: IStaffInRequestDTO
  name: string
  relationship: string
  contact: IContactInRequestDTO | ICreateContactRequestDTO
}

/**
 * Class representing a relative.
 * @class
 */
export class RelativeEntity {
  private _staff: IStaffInRequestDTO
  private _name: string
  private _relationship: string
  private _contact: ICreateContactRequestDTO | ICreateContactRequestDTO

  /**
   * Create an instance of RelativeEntity.
   * @constructor
   * @param {RelativeInterface} props - The properties of the relative.
   */
  constructor(props: RelativeInterface) {
    this._staff = props.staff
    this._name = props.name
    this._relationship = props.relationship
    this._contact = props.contact
  }

  /**
   * Create a new relative instance with provided data.
   * @static
   * @param {ICreateRelativeRequestDTO} data - The data to create a relative.
   * @returns {RelativeEntity} The created relative instance.
   */
  static create({
    staff,
    name,
    relationship,
    contact,
  }: ICreateRelativeRequestDTO): RelativeEntity {
    return new RelativeEntity({
      staff: staff,
      name: name,
      relationship: relationship,
      contact: contact,
    })
  }

  /**
   * Update the relative instance with provided data.
   * @static
   * @param {IUpdateRelativeRequestDTO} updatedRelative - The data to update a relative.
   * @returns {IUpdateRelativeRequestDTO} The updated relative instance.
   */
  static update(
    updatedRelative: IUpdateRelativeRequestDTO
  ): IUpdateRelativeRequestDTO {
    return updatedRelative
  }

  /**
   * Gets the staff associated with the relative.
   * @readonly
   */
  get staff(): IStaffInRequestDTO {
    return this._staff
  }

  /**
   * Gets the relative's name.
   * @readonly
   */
  get name(): string {
    return this._name
  }

  /**
   * Gets the relative's relationship.
   * @readonly
   */
  get relationship(): string {
    return this._relationship
  }

  /**
   * Gets the contact associated with the relative.
   * @readonly
   */
  get contact(): ICreateContactRequestDTO | ICreateContactRequestDTO {
    return this._contact
  }
}
