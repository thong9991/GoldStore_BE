import { IGetContactByIdsUseCase } from '../../../../../app/useCases/Contact/GetContactByIds'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling requests to get all contacts by ID list.
 * @class
 * @implements {IController}
 */
export class GetContactByIdsController implements IController {
  /**
   * Creates an instance of GetContactByIdsController.
   * @constructor
   * @param {IGetContactByIdsUseCase} getContactByIdsUseCase - The use case for getting all contacts by ID list.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private getContactByIdsUseCase: IGetContactByIdsUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get all contacts by ID list.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} A promise resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates body parameters.
    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)

      if (bodyParams.includes('idList')) {
        const getContactByIdsRequestDTO = httpRequest.body as {
          idList: number[]
        }

        // Executes the get all contact use case.
        response = await this.getContactByIdsUseCase.execute(
          getContactByIdsRequestDTO.idList
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Get contacts failed, return a 404 Not Found error.
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get contacts succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
