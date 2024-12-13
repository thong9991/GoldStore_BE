import { IDeleteVendorUseCase } from '../../../../../app/useCases/Vendor/DeleteVendor'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to delete a vendor.
 * @class
 * @implements {IController}
 */
export class DeleteVendorController implements IController {
  /**
   * Creates an instance of DeleteVendorController.
   * @constructor
   * @param {IDeleteVendorUseCase} deleteVendorUseCase - The use case for deleting a vendor.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private deleteVendorUseCase: IDeleteVendorUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to delete a vendor.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    // Extract vendor ID from path parameters.
    const id = (httpRequest.path as { id: number }).id

    // Execute the delete vendor use case.
    const response = await this.deleteVendorUseCase.execute(id)

    if (!response.success) {
      // Delete vendor failed, return a 400 Bad Request error.
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete vendor succeeded, return a 200 OK response.
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
