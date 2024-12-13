import { IUpdateRelativeUseCase } from '../../../../../app/useCases/Relative/UpdateRelative'
import { IContactInRequestDTO } from '../../../../../domain/dtos/Contact/ContactIn'
import { IStaffInRequestDTO } from '../../../../../domain/dtos/Staff/StaffIn'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling update relative request.
 * @class
 * @implements {IController}
 */
export class UpdateRelativeController implements IController {
  /**
   * Creates an instance of UpdateRelativeController.
   * @constructor
   * @param {IUpdateRelativeUseCase} updateRelativeUseCase - The use case for updating the relative information.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateRelativeUseCase: IUpdateRelativeUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the relative information.
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
        (bodyParams.includes('name') || bodyParams.includes('relationship'))
      ) {
        const id = (httpRequest.path as { id: number }).id
        const updateRelativeRequestDTO = httpRequest.body as {
          name: string
          relationship: string
        }

        // Executes the update relative use case.
        response = await this.updateRelativeUseCase.execute(
          id,
          updateRelativeRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update relative failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update relative succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
