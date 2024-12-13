/**
 * Data Transfer Object (DTO) representing the request to update a staff user.
 * @interface
 */
export interface IUpdateStaffRequestDTO {
  /**
   * The updated ID of the staff user.
   */
  id?: number

  /**
   * The updated first name of the staff user.
   */
  firstName?: string

  /**
   * The updated last name of the staff user.
   */
  lastName?: string

  /**
   * The updated phone number of the staff user.
   */
  phone?: string

  /**
   * The updated address of the staff user.
   */
  address?: string
}
