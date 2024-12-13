import { IDeleteGoldPriceUseCase } from '../../../../../app/useCases/GoldPrice/DeleteGoldPrice'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to delete a gold price.
 * @class
 * @implements {IController}
 */
export class DeleteGoldPriceController implements IController {
  /**
   * Creates an instance of DeleteGoldPriceController.
   * @constructor
   * @param {IDeleteGoldPriceUseCase} deleteGoldPriceUseCase - The use case for deleting a gold price.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private deleteGoldPriceUseCase: IDeleteGoldPriceUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to delete a gold price.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    // Extract gold type from path parameters.
    const goldType = (httpRequest.path as { goldType: string }).goldType

    // Execute the delete gold price use case.
    const response = await this.deleteGoldPriceUseCase.execute(goldType)

    if (!response.success) {
      // Delete gold price failed, return a 400 Bad Request error.
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete gold price succeeded, return a 200 OK response.
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
