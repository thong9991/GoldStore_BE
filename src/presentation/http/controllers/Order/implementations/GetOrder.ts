import { IGetAllOrderUseCase } from '../../../../../app/useCases/Order/GetAllOrder'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling requests to get all orders.
 * @class
 * @implements {IController}
 */
export class GetOrderController implements IController {
  /**
   * Creates an instance of GetOrderController.
   * @constructor
   * @param {IGetAllOrderUseCase} getAllOrderUseCase - The use case for getting all orders.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private getAllOrderUseCase: IGetAllOrderUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get all orders.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} A promise resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates query parameters.
    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const queryStringParams = Object.keys(httpRequest.query)

      if (queryStringParams.includes('page')) {
        const page = (httpRequest.query as { page: number }).page

        // Executes the get all order use case.
        response = await this.getAllOrderUseCase.execute(page)
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Get all orders failed, return a 404 Not Found error.
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get all orders succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
