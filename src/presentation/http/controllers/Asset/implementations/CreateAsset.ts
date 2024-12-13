import { ICreateAssetUseCase } from '../../../../../app/useCases/Asset/CreateAsset'
import { ICashDrawerInRequestDTO } from '../../../../../domain/dtos/CashDrawer/CashDrawerIn'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to create asset.
 * @class
 * @implements {IController}
 */
export class CreateAssetController implements IController {
  /**
   * Creates an instance of CreateAssetController.
   * @constructor
   * @param {ICreateAssetUseCase} createAssetUseCase - The use case for creating asset.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private createAssetUseCase: ICreateAssetUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to create a new asset.
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
        bodyParams.includes('cashDrawer') &&
        bodyParams.includes('assetType') &&
        bodyParams.includes('amount')
      ) {
        const createAssetRequestDTO = httpRequest.body as {
          cashDrawer: ICashDrawerInRequestDTO
          assetType: string
          amount: number
        }

        // Executes the create asset use case.
        response = await this.createAssetUseCase.execute(createAssetRequestDTO)
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Create asset failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Create asset succeeded, return a 201 Created response.
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
