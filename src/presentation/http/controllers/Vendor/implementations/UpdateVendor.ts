import { IUpdateVendorUseCase } from '../../../../../app/useCases/Vendor/UpdateVendor'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling update vendor request.
 * @class
 * @implements {IController}
 */
export class UpdateVendorController implements IController {
  /**
   * Creates an instance of UpdateVendorController.
   * @constructor
   * @param {IUpdateVendorUseCase} updateVendorUseCase - The use case for updating the vendor information.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateVendorUseCase: IUpdateVendorUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the vendor information.
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
        (bodyParams.includes('vendorName') ||
          bodyParams.includes('vendorCode') ||
          bodyParams.includes('vendorAddress'))
      ) {
        const id = (httpRequest.path as { id: number }).id
        const updateVendorRequestDTO = httpRequest.body as {
          vendorName: string
          vendorCode: string
          vendorAddress: string
        }

        // Executes the update vendor use case.
        response = await this.updateVendorUseCase.execute(
          id,
          updateVendorRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update vendor failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update vendor succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
