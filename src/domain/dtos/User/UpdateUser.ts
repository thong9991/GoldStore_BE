import { IStaffInRequestDTO } from '../Staff/StaffIn'

/**
 * Data Transfer Object (DTO) representing the request to update a user.
 * @interface
 */
export interface IUpdateUserRequestDTO {
  /**
   * The updated ID of the user.
   */
  id?: number

  /**
   * The updated role of the user.
   */
  role?: string

  /**
   * The updated email of the user.
   */
  email?: string

  /**
   * The updated username of the user.
   */
  username?: string

  /**
   * The updated password of the user.
   */
  password?: string

  /**
   * The updated fcm token of the user.
   */
  fcmToken?: string

  /**
   * The updated staff information associated with the user.
   */
  staff?: IStaffInRequestDTO
}
