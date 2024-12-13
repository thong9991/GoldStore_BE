import { ICreateNotificationUseCase } from '../../../../../app/useCases/Notification/CreateNotification'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to create vendor.
 * @class
 * @implements {IController}
 */
export class CreateNotificationController implements IController {
  /**
   * Creates an instance of CreateNotificationController.
   * @constructor
   * @param {ICreateNotificationUseCase} createNotificationUseCase - The use case for creating vendor.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private createNotificationUseCase: ICreateNotificationUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to create a new vendor.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates header and body parameters.
    if (
      httpRequest.header &&
      httpRequest.body &&
      Object.keys(httpRequest.header).length > 0 &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body)
      const headersParams = Object.keys(httpRequest.header)
      if (
        headersParams.includes('user_id') &&
        bodyParams.includes('title') &&
        bodyParams.includes('body') &&
        bodyParams.includes('data')
      ) {
        const user_id = (httpRequest.header as { user_id: number }).user_id
        const createNotificationRequestDTO = httpRequest.body as {
          title: string
          body: string
          data: { [key: string]: string }
        }

        // Executes the create vendor use case.
        response = await this.createNotificationUseCase.execute(user_id, {
          ...createNotificationRequestDTO,
          user: {
            id: -1,
            role: '',
            email: '',
            fcmToken: '',
            username: '',
            password: '',
          },
        })
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Create vendor failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Create vendor succeeded, return a 201 Created response.
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
