import { ICreateProductUseCase } from '../../../../../app/useCases/Product/CreateProduct'
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
 * Controller for handling request to create product.
 * @class
 * @implements {IController}
 */
export class CreateProductController implements IController {
  /**
   * Creates an instance of CreateProductController.
   * @constructor
   * @param {ICreateProductUseCase} createProductUseCase - The use case for creating product.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private createProductUseCase: ICreateProductUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to create a new product.
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
        bodyParams.includes('productName') &&
        bodyParams.includes('category') &&
        bodyParams.includes('goldPrice') &&
        bodyParams.includes('totalWeight') &&
        bodyParams.includes('goldWeight') &&
        bodyParams.includes('gemWeight') &&
        bodyParams.includes('wage') &&
        bodyParams.includes('vendor')
      ) {
        const createProductRequestDTO = httpRequest.body as {
          productName: string
          category: ProductCategory
          goldPrice: IGoldPriceInRequestDTO
          totalWeight: number
          goldWeight: number
          gemWeight: number
          wage: number
          vendor: IVendorInRequestDTO
        }

        // Executes the create product use case.
        response = await this.createProductUseCase.execute(
          createProductRequestDTO
        )
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Create product failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Create product succeeded, return a 201 Created response.
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
