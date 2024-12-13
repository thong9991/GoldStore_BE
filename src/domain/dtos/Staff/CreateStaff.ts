/**
 * Data Transfer Object (DTO) representing the request to create a staff.
 * @interface
 */
export interface ICreateStaffRequestDTO {
  /**
   * The first name of the staff user.
   */
  firstName: string

  /**
   * The last name of the staff user.
   */
  lastName: string

  /**
   * The phone number of the staff user.
   */
  phone: string

  /**
   * The address of the staff user.
   */
  address: string
}
