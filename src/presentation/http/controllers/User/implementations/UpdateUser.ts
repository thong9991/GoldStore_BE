import { IUpdateUserUseCase } from '../../../../../app/useCases/User/UpdateUser'
import { IStaffInRequestDTO } from '../../../../../domain/dtos/Staff/StaffIn'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request update user request.
 * @class
 * @implements {IController}
 */
export class UpdateUserController implements IController {
  /**
   * Creates an instance of UpdateUserController.
   * @constructor
   * @param {IUpdateUserUseCase} updateUserUseCase - The use case for updating the user information.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateUserUseCase: IUpdateUserUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the user information.
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
        pathStringParams.includes('id') &&
        (bodyParams.includes('role') ||
          bodyParams.includes('password') ||
          bodyParams.includes('staff'))
      ) {
        const id = (httpRequest.path as { id: number }).id
        const updateUserRequestDTO = httpRequest.body as {
          role: string
          password: string
          staff: IStaffInRequestDTO
        }

        // Executes the update user use case.
        response = await this.updateUserUseCase.execute(
          id,
          updateUserRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update user failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update user succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
