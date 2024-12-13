import { IGetProductByIdUseCase } from '../../../../../app/useCases/Product/GetProductById'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling requests to get a product by its ID.
 * @class
 * @implements {IController}
 */
export class GetProductByIdController implements IController {
  /**
   * Creates an instance of GetProductByIdController.
   * @constructor
   * @param {IGetProducByIdUseCase} getProductByIdUseCase - The use case for getting a product.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private getProductByIdUseCase: IGetProductByIdUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get a product by its ID.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} A promise resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates path parameters.
    if (httpRequest.path) {
      const pathStringParams = Object.keys(httpRequest.path)

      if (pathStringParams.includes('id')) {
        const id = (httpRequest.path as { id: number }).id

        // Executes the get all product use case.
        response = await this.getProductByIdUseCase.execute(id)
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Get a product failed, return a 404 Not Found error.
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get a product succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
