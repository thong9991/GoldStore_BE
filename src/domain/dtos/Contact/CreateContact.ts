import { PhoneType } from './Contact'

/**
 * Data Transfer Object (DTO) representing the request to create a contact.
 * @interface
 */
export interface ICreateContactRequestDTO {
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
}
