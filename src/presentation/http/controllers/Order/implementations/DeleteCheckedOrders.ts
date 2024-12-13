import { IDeleteCheckedOrdersUseCase } from '../../../../../app/useCases/Order/DeleteCheckedOrders'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to delete checked orders.
 * @class
 * @implements {IController}
 */
export class DeleteCheckedOrdersController implements IController {
  /**
   * Creates an instance of DeleteCheckedOrdersController.
   * @constructor
   * @param {IDeleteCheckedOrdersUseCase} deleteCheckedOrdersUseCase - The use case for deleting checked orders.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private deleteCheckedOrdersUseCase: IDeleteCheckedOrdersUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to delete a order.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    // Execute the delete order use case.
    const response = await this.deleteCheckedOrdersUseCase.execute()

    if (!response.success) {
      // Delete order failed, return a 400 Bad Request error.
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete order succeeded, return a 200 OK response.
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
