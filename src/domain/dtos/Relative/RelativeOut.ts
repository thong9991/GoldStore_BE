import { ContactDTO } from '../Contact/Contact'
import { StaffDTO } from '../Staff/Staff'

/**
 * Data Transfer Object (DTO) representing the output of relative data.
 * @interface
 */
export interface IRelativeOutRequestDTO {
  /**
   * The ID of the relative.
   */
  id: number

  /**
   * The staff information associated with the relative.
   */
  staff: StaffDTO

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
  contact: ContactDTO

  /**
   * The optional created date of the relative.
   */
  createdAt?: Date

  /**
   * The optional updated date of the relative.
   */
  updatedAt?: Date
}
