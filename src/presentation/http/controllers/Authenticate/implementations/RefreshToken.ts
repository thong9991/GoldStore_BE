import { IRefreshTokenUseCase } from '../../../../../app/useCases/Authenticate/RefreshToken'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling requests to refresh token.
 * @class
 * @implements {IController}
 */
export class RefreshTokenController implements IController {
  /**
   * Creates an instance of RefreshTokenController.
   * @constructor
   * @param {IRefreshTokenUseCase} refreshTokenUseCase - The use case for refreshing the token.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private refreshTokenUseCase: IRefreshTokenUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to refresh token.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} A promise resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates path parameters.
    if (httpRequest.path) {
      const user_id = (httpRequest.path as { user_id: number }).user_id

      // Executes the token refresh use case.
      response = await this.refreshTokenUseCase.execute(user_id)

      if (!response.success) {
        // Token refresh failed, return a 404 Not found error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Token refresh succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
