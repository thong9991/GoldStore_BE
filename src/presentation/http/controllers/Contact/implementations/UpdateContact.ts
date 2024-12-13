import { IUpdateContactUseCase } from '../../../../../app/useCases/Contact/UpdateContact'
import { PhoneType } from '../../../../../domain/dtos/Contact/Contact'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling update contact request.
 * @class
 * @implements {IController}
 */
export class UpdateContactController implements IController {
  /**
   * Creates an instance of UpdateContactController.
   * @constructor
   * @param {IUpdateContactUseCase} updateContactUseCase - The use case for updating the contact information.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateContactUseCase: IUpdateContactUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the contact information.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates header, path and body parameters.
    if (
      httpRequest.header &&
      httpRequest.body &&
      httpRequest.path &&
      Object.keys(httpRequest.header).length > 0 &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const headerParams = Object.keys(httpRequest.header)
      const bodyParams = Object.keys(httpRequest.body)
      const pathStringParams = Object.keys(httpRequest.path)

      if (
        headerParams.includes('user_id') &&
        pathStringParams.includes('id') &&
        (bodyParams.includes('name') ||
          bodyParams.includes('phoneType') ||
          bodyParams.includes('phone') ||
          bodyParams.includes('description'))
      ) {
        const user_id = (httpRequest.header as { user_id: number }).user_id
        const id = (httpRequest.path as { id: number }).id
        const updateContactRequestDTO = httpRequest.body as {
          name: string
          phoneType: PhoneType
          phone: string
          description: string
        }

        // Executes the update contact use case.
        response = await this.updateContactUseCase.execute(
          user_id,
          id,
          updateContactRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update contact failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update contact succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
