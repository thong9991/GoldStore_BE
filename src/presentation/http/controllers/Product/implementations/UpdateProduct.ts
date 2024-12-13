import { IUpdateProductUseCase } from '../../../../../app/useCases/Product/UpdateProduct'
import { IGoldPriceInRequestDTO } from '../../../../../domain/dtos/GoldPrice/GoldPriceIn'
import { ProductCategory } from '../../../../../domain/dtos/Product/Product'
import { IVendorInRequestDTO } from '../../../../../domain/dtos/Vendor/VendorIn'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling update product request.
 * @class
 * @implements {IController}
 */
export class UpdateProductController implements IController {
  /**
   * Creates an instance of UpdateProductController.
   * @constructor
   * @param {IUpdateProductUseCase} updateProductUseCase - The use case for updating the product information.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private updateProductUseCase: IUpdateProductUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to update the product information.
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
        (bodyParams.includes('productName') ||
          bodyParams.includes('category') ||
          bodyParams.includes('goldPrice') ||
          bodyParams.includes('totalWeight') ||
          bodyParams.includes('goldWeight') ||
          bodyParams.includes('gemWeight') ||
          bodyParams.includes('wage') ||
          bodyParams.includes('vendor'))
      ) {
        const id = (httpRequest.path as { id: number }).id
        const updateProductRequestDTO = httpRequest.body as {
          productName: string
          category: ProductCategory
          goldPrice: IGoldPriceInRequestDTO
          totalWeight: number
          goldWeight: number
          gemWeight: number
          wage: number
          vendor: IVendorInRequestDTO
        }

        // Executes the update product use case.
        response = await this.updateProductUseCase.execute(
          id,
          updateProductRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update product failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update product succeeded, return a 200 OK response.
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
