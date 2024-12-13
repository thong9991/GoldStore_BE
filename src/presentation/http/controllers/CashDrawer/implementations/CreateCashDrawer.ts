import { ICreateCashDrawerUseCase } from '../../../../../app/useCases/CashDrawer/CreateCashDrawer'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to create cash drawer.
 * @class
 * @implements {IController}
 */
export class CreateCashDrawerController implements IController {
  /**
   * Creates an instance of CreateCashDrawerController.
   * @constructor
   * @param {ICreateCashDrawerUseCase} createCashDrawerUseCase - The use case for creating cash drawer.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private createCashDrawerUseCase: ICreateCashDrawerUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to create a new cash drawer.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates body parameters.
    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)

      if (
        bodyParams.includes('drawerName') &&
        bodyParams.includes('drawerType')
      ) {
        const createCashDrawerRequestDTO = httpRequest.body as {
          drawerName: string
          drawerType: string
        }

        // Executes the create cash drawer use case.
        response = await this.createCashDrawerUseCase.execute(
          createCashDrawerRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Create cash drawer failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Create cash drawer succeeded, return a 201 Created response.
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
