import { IContactInRequestDTO } from '../Contact/ContactIn'
import { ICreateContactRequestDTO } from '../Contact/CreateContact'
import { IStaffInRequestDTO } from '../Staff/StaffIn'

/**
 * Data Transfer Object (DTO) representing the request to create a relative.
 * @interface
 */
export interface ICreateRelativeRequestDTO {
  /**
   * The staff information associated with the relative.
   */
  staff: IStaffInRequestDTO

  /**
   * The name of the relative.
   */
  name: string

  /**
   * The relationship of the relative.
   */
  relationship: string

  /**
   * The contact information associated with the relative.
   */
  contact: IContactInRequestDTO | ICreateContactRequestDTO
}
