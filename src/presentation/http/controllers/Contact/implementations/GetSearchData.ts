import { IGetAllSearchDataUseCase } from '../../../../../app/useCases/Contact/GetAllSearchData'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling requests to get all search data.
 * @class
 * @implements {IController}
 */
export class GetSearchDataController implements IController {
  /**
   * Creates an instance of GetAllSearchDataController.
   * @constructor
   * @param {IGetAllSearchDataUseCase} getAllSearchDataUseCase - The use case for getting all search data.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private getAllSearchDataUseCase: IGetAllSearchDataUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get all search data.
   * @async
   * @param {HttpRequest} _httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} A promise resolves to an HTTP response.
   */
  async handle(_httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Executes the get all search data use case.
    response = await this.getAllSearchDataUseCase.execute()

    if (!response.success) {
      // Get all search data failed, return a 404 Not Found error.
      error = this.httpErrors.error_404()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Get all search data succeeded, return a 200 OK response.
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
