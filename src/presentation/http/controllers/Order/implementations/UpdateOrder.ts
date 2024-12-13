import { IUpdateOrderUseCase } from '../../../../../app/useCases/Order/UpdateOrder'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling update order request.
 * @class
 * @implements {IController}
 */
export class UpdateOrderController implements IController {
  /**
   * Creates an instance of UpdateOrderController.
   * @constructor
   * @param {IUpdateOrderUseCase} updateOrderUseCase - The use case for updating the order information.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateOrderUseCase: IUpdateOrderUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the order information.
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
        (bodyParams.includes('total') ||
          bodyParams.includes('goldToCash') ||
          bodyParams.includes('discount') ||
          bodyParams.includes('isChecked') ||
          bodyParams.includes('description'))
      ) {
        const id = (httpRequest.path as { id: string }).id
        const updateOrderRequestDTO = httpRequest.body as {
          total: number
          goldToCash: number
          discount: number
          isChecked: boolean
          description: string
        }

        // Executes the update order use case.
        response = await this.updateOrderUseCase.execute(
          id,
          updateOrderRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update order failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update order succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
