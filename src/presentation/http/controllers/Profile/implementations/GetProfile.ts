import { IGetProfileUseCase } from '../../../../../app/useCases/Profile/GetProfile'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling requests to get staff profile by its user ID.
 * @class
 * @implements {IController}
 */
export class GetProfileController implements IController {
  /**
   * Creates an instance of GetProfileController.
   * @constructor
   * @param {IGetProfileUseCase} getProfileUseCase - The use case for getting a staff profile.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private getProfileUseCase: IGetProfileUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get a staff profile by its user ID.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} A promise resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates path parameters.
    if (httpRequest.path) {
      const pathStringParams = Object.keys(httpRequest.path)

      if (pathStringParams.includes('user_id')) {
        const user_id = (httpRequest.path as { user_id: number }).user_id

        // Executes the get staff profile use case.
        response = await this.getProfileUseCase.execute(user_id)
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Get profile failed, return a 404 Not Found error.
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get profile succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
