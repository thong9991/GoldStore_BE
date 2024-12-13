import { ICreateUserUseCase } from '../../../../../app/useCases/User/CreateUser'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to create user.
 * @class
 * @implements {IController}
 */
export class CreateUserController implements IController {
  /**
   * Creates an instance of CreateUserController.
   * @constructor
   * @param {ICreateUserUseCase} createUserUseCase - The use case for creating user.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private createUserUseCase: ICreateUserUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to create a new user.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates body parameters.
    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)

      if (
        bodyParams.includes('email') &&
        bodyParams.includes('username') &&
        bodyParams.includes('password')
      ) {
        const createUserRequestDTO = httpRequest.body as {
          username: string
          email: string
          password: string
        }

        // Executes the create user use case.
        response = await this.createUserUseCase.execute({
          ...createUserRequestDTO,
          role: 'user',
        })
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Create user failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Create user succeeded, return a 201 Created response.
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
