import { IRecoverUserInformationUseCase } from '../../../../../app/useCases/Authenticate/RecoverUserInformation'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling requests to recover user information.
 * @class
 * @implements {IController}
 */
export class RecoverUserInformationController implements IController {
  /**
   * Creates an instance of RecoverUserInformationController.
   * @constructor
   * @param {IRecoverUserInformationUseCase} recoverUserInformationUseCase - The use case for recovering the user information.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private recoverUserInformationUseCase: IRecoverUserInformationUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to recover user information.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} A promise resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates body parameters.
    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)
      const user_id = (httpRequest.path as { user_id: number }).user_id

      if (bodyParams.includes('refreshTokenId')) {
        const recoverUserInformationDTO = httpRequest.body as {
          refreshTokenId: string
        }

        // Executes the token refresh use case.
        response = await this.recoverUserInformationUseCase.execute({
          ...recoverUserInformationDTO,
          user_id: user_id,
        })
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Recover information failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Recover information succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
