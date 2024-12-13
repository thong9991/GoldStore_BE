/**
 * Data Transfer Object (DTO) representing the request to update a admin.
 * @interface
 */
export interface IUpdateAdminRequestDTO {
  /**
   * The updated ID of the admin.
   */
  id?: number

  /**
   * The updated email of the admin.
   */
  email?: string

  /**
   * The updated username of the admin.
   */
  username?: string

  /**
   * The updated password of the admin.
   */
  password?: string
}
