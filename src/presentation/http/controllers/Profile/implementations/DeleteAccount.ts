import { IDeleteUserUseCase } from '../../../../../app/useCases/User/DeleteUser'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to delete a user account.
 * @class
 * @implements {IController}
 */
export class DeleteAccountController implements IController {
  /**
   * Creates an instance of DeleteAccountController.
   * @constructor
   * @param {IDeleteUserUseCase} deleteUserUseCase - The use case for deleting a user account.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private deleteUserUseCase: IDeleteUserUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to delete a user account.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    // Extract user ID from path parameters.
    const user_id = (httpRequest.path as { user_id: number }).user_id

    // Execute the delete user use case.
    const response = await this.deleteUserUseCase.execute(user_id)

    if (!response.success) {
      // Delete user failed, return a 400 Bad Request error.
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete user succeeded, return a 200 OK response.
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
