/**
 * Data Transfer Object (DTO) representing the input for refreshing the user's authentication token.
 * @interface
 */
export interface IRefreshTokenUserDTO {
  /**
   * The identifier of the token for the authentication token refresh.
   */
  refreshTokenId: string
}
