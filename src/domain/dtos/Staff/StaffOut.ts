/**
 * Data Transfer Object (DTO) representing the output of staff user data.
 * @interface
 */
export interface IStaffOutRequestDTO {
  /**
   * The ID of the staff user.
   */
  id: number

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

  /**
   * The optional created date of staff account.
   */
  createdAt?: Date

  /**
   * The optional updated date of staff account.
   */
  updatedAt?: Date
}
