import { IUpdateAccountUseCase } from '../../../../../app/useCases/Profile/UpdateAccount'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request update user account request.
 * @class
 * @implements {IController}
 */
export class UpdateAccountController implements IController {
  /**
   * Creates an instance of UpdateAccountController.
   * @constructor
   * @param {IUpdateAccountUseCase} updateAccountUseCase - The use case for updating the user account.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateAccountUseCase: IUpdateAccountUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the user account.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates path and body parameters.
    if (
      httpRequest.body &&
      httpRequest.path &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body)
      const pathStringParams = Object.keys(httpRequest.path)

      if (
        pathStringParams.includes('user_id') &&
        bodyParams.includes('oldPassword') &&
        (bodyParams.includes('email') || bodyParams.includes('username'))
      ) {
        const user_id = (httpRequest.path as { user_id: number }).user_id

        const updateAccountRequestDTO = httpRequest.body as {
          oldPassword: string
          email: string
          username: string
        }

        // Executes the update user account use case.
        response = await this.updateAccountUseCase.execute(
          user_id,
          updateAccountRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update user account failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update user account succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
