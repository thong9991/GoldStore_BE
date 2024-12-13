import { IContactInRequestDTO } from '../Contact/ContactIn'
import { IStaffInRequestDTO } from '../Staff/StaffIn'

/**
 * Data Transfer Object (DTO) representing the request to update a relative.
 * @interface
 */
export interface IUpdateRelativeRequestDTO {
  /**
   * The updated ID of the relative.
   */
  id?: number

  /**
   * The updated staff information associated with the relative.
   */
  staff?: IStaffInRequestDTO

  /**
   * The updated name of the relative.
   */
  name?: string

  /**
   * The updated relationship of the relative.
   */
  relationship?: string

  /**
   * The updated contact information associated with the relative.
   */
  contact?: IContactInRequestDTO
}
