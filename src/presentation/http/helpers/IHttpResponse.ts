/**
 * Interface representing an HTTP response.
 * @interface
 */
export interface IHttpResponse {
  /**
   * The status code of the HTTP response.
   */
  statusCode: number

  /**
   * The body of the HTTP response.
   */
  body: Record<string, string>
}
