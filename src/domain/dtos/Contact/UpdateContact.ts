import { PhoneType } from './Contact'

/**
 * Data Transfer Object (DTO) representing the request to update a contact.
 * @interface
 */
export interface IUpdateContactRequestDTO {
  /**
   * The updated ID of the contact.
   */
  id?: number

  /**
   * The updated name of the contact.
   */
  name?: string

  /**
   * The updated type of the contact.
   */
  phoneType?: PhoneType

  /**
   * The updated phone number of the contact.
   */
  phone?: string

  /**
   * The updated description of the contact.
   */
  description?: string
}
