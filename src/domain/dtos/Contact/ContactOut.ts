import { PhoneType } from './Contact'

/**
 * Data Transfer Object (DTO) representing the output of contact data.
 * @interface
 */
export interface IContactOutRequestDTO {
  /**
   * The ID of the contact.
   */
  id: number

  /**
   * The name of the contact.
   */
  name: string

  /**
   * The type of the contact.
   */
  phoneType: PhoneType

  /**
   * The phone number of the contact.
   */
  phone: string

  /**
   * The description of the contact.
   */
  description?: string

  /**
   * The optional created date of the contact.
   */
  createdAt?: Date

  /**
   * The optional updated date of the contact.
   */
  updatedAt?: Date
}
