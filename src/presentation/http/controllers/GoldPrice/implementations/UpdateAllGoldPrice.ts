import { IUpdateAllGoldPriceUseCase } from '../../../../../app/useCases/GoldPrice/UpdateAllGoldPrice'
import { IUpdateGoldPriceRequestDTO } from '../../../../../domain/dtos/GoldPrice/UpdateGoldPrice'
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
export class UpdateAllGoldPriceController implements IController {
  /**
   * Creates an instance of UpdateAllGoldPriceController.
   * @constructor
   * @param {IUpdateAllGoldPriceUseCase} updateAllGoldPriceUseCase - The use case for updating the gold price data.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateAllGoldPriceUseCase: IUpdateAllGoldPriceUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the gold price data.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates header and body parameters.
    if (
      httpRequest.header &&
      httpRequest.body &&
      Object.keys(httpRequest.header).length > 0 &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body)
      const headersParams = Object.keys(httpRequest.header)
      if (
        headersParams.includes('user_id') &&
        bodyParams.includes('goldPrices')
      ) {
        const user_id = (httpRequest.header as { user_id: number }).user_id
        const updateGoldPriceRequestDTO = httpRequest.body as {
          goldPrices: IUpdateGoldPriceRequestDTO[]
        }

        // Executes the update gold price use case.
        response = await this.updateAllGoldPriceUseCase.execute(
          user_id,
          updateGoldPriceRequestDTO.goldPrices
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
