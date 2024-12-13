import { ICreateRelativeUseCase } from '../../../../../app/useCases/Relative/CreateRelative'
import { ICreateContactRequestDTO } from '../../../../../domain/dtos/Contact/CreateContact'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to create relative.
 * @class
 * @implements {IController}
 */
export class CreateRelativeController implements IController {
  /**
   * Creates an instance of CreateRelativeController.
   * @constructor
   * @param {ICreateRelativeUseCase} createRelativeUseCase - The use case for creating relative.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private createRelativeUseCase: ICreateRelativeUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to create a new relative.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates body and path parameters.
    if (
      httpRequest.body &&
      httpRequest.path &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body)
      const pathStringParams = Object.keys(httpRequest.path)

      if (
        pathStringParams.includes('user_id') &&
        bodyParams.includes('name') &&
        bodyParams.includes('relationship') &&
        bodyParams.includes('contact')
      ) {
        const user_id = (httpRequest.path as { user_id: number }).user_id

        const createRelativeRequestDTO = httpRequest.body as {
          name: string
          relationship: string
          contact: ICreateContactRequestDTO
        }

        // Executes the create relative use case.
        response = await this.createRelativeUseCase.execute(user_id, {
          ...createRelativeRequestDTO,
          staff: {
            id: -1,
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
          },
        })
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Create relative failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Create relative succeeded, return a 201 Created response.
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
