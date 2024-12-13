import { IUpdateProfileUseCase } from '../../../../../app/useCases/Profile/UpdateProfile'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling update staff profile request.
 * @class
 * @implements {IController}
 */
export class UpdateProfileController implements IController {
  /**
   * Creates an instance of UpdateProfileController.
   * @constructor
   * @param {IUpdateProfileUseCase} updateProfileUseCase - The use case for updating the staff profile.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateProfileUseCase: IUpdateProfileUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the staff profile.
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
        (bodyParams.includes('firstName') ||
          bodyParams.includes('lastName') ||
          bodyParams.includes('phone') ||
          bodyParams.includes('address'))
      ) {
        const user_id = (httpRequest.path as { user_id: number }).user_id
        const updateStaffRequestDTO = httpRequest.body as {
          firstName: string
          lastName: string
          phone: string
          address: string
        }

        // Executes the update staff use case.
        response = await this.updateProfileUseCase.execute(
          user_id,
          updateStaffRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update staff failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update staff succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
