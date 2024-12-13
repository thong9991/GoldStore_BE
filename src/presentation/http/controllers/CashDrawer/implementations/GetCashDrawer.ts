import { IGetAllCashDrawerUseCase } from '../../../../../app/useCases/CashDrawer/GetAllCashDrawer'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling requests to get all cash drawers.
 * @class
 * @implements {IController}
 */
export class GetCashDrawerController implements IController {
  /**
   * Creates an instance of GetCashDrawerController.
   * @constructor
   * @param {IGetAllCashDrawerUseCase} getAllCashDrawerUseCase - The use case for getting all cash drawers.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private getAllCashDrawerUseCase: IGetAllCashDrawerUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get all cash drawers.
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

        // Executes the get all cash drawer use case.
        response = await this.getAllCashDrawerUseCase.execute(page)
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Get all cash drawers failed, return a 404 Not Found error.
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get all cash drawers succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
