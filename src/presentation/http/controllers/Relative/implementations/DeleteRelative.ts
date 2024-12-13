import { IDeleteRelativeUseCase } from '../../../../../app/useCases/Relative/DeleteRelative'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to delete a relative.
 * @class
 * @implements {IController}
 */
export class DeleteRelativeController implements IController {
  /**
   * Creates an instance of DeleteRelativeController.
   * @constructor
   * @param {IDeleteRelativeUseCase} deleteRelativeUseCase - The use case for deleting a relative.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private deleteRelativeUseCase: IDeleteRelativeUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to delete a relative.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    // Extract relative ID from path parameters.
    const id = (httpRequest.path as { id: number }).id

    // Execute the delete relative use case.
    const response = await this.deleteRelativeUseCase.execute(id)

    if (!response.success) {
      // Delete relative failed, return a 400 Bad Request error.
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete relative succeeded, return a 200 OK response.
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
