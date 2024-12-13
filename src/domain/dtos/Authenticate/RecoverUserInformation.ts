/**
 * Data Transfer Object (DTO) representing the input for recovering the user's authentication token
 * and information.
 * @interface
 */
export interface IRecoverUserInformationDTO {
  /**
   * The ID of the user for recovering the user's information.
   */
  user_id: number

  /**
   * The identifier of the token for recovering the user's information.
   */
  refreshTokenId: string
}
