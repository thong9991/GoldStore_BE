import { IUpdateGoldPriceUseCase } from '../../../../../app/useCases/GoldPrice/UpdateGoldPrice'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling update gold price request.
 * @class
 * @implements {IController}
 */
export class UpdateGoldPriceController implements IController {
  /**
   * Creates an instance of UpdateGoldPriceController.
   * @constructor
   * @param {IUpdateGoldPriceUseCase} updateGoldPriceUseCase - The use case for updating the gold price information.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateGoldPriceUseCase: IUpdateGoldPriceUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the gold price information.
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
        pathStringParams.includes('goldType') &&
        (bodyParams.includes('askPrice') || bodyParams.includes('bidPrice'))
      ) {
        const goldType = (httpRequest.path as { goldType: string }).goldType
        const updateGoldPriceRequestDTO = httpRequest.body as {
          askPrice: number
          bidPrice: number
        }

        // Executes the update gold price use case.
        response = await this.updateGoldPriceUseCase.execute(
          goldType,
          updateGoldPriceRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update gold price failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update gold price succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
