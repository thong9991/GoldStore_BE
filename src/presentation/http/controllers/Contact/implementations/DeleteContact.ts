import { IDeleteContactUseCase } from '../../../../../app/useCases/Contact/DeleteContact'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to delete a contact.
 * @class
 * @implements {IController}
 */
export class DeleteContactController implements IController {
  /**
   * Creates an instance of DeleteContactController.
   * @constructor
   * @param {IDeleteContactUseCase} deleteContactUseCase - The use case for deleting a contact.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private deleteContactUseCase: IDeleteContactUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to delete a contact.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    // Extract contact ID from path parameters.
    const user_id = (httpRequest.header as { user_id: number }).user_id
    const id = (httpRequest.path as { id: number }).id

    // Execute the delete contact use case.
    const response = await this.deleteContactUseCase.execute(user_id, id)

    if (!response.success) {
      // Delete contact failed, return a 400 Bad Request error.
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete contact succeeded, return a 200 OK response.
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
