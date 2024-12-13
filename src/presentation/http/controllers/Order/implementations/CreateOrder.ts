import { ICreateOrderUseCase } from '../../../../../app/useCases/Order/CreateOrder'
import { IOrderExchangeInRequestDTO } from '../../../../../domain/dtos/OrderExchange/OrderExchangeIn'
import { IOrderSaleInRequestDTO } from '../../../../../domain/dtos/OrderSale/OrderSaleIn'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling request to create order.
 * @class
 * @implements {IController}
 */
export class CreateOrderController implements IController {
  /**
   * Creates an instance of CreateOrderController.
   * @constructor
   * @param {ICreateOrderUseCase} createOrderUseCase - The use case for creating order.
   * @param {HttpErrors} httpErrors - The HTTP error utility.
   * @param {HttpSuccess} httpSuccess - The HTTP success utility.
   */
  constructor(
    private createOrderUseCase: ICreateOrderUseCase,
    private httpErrors: HttpErrors = new HttpErrors(),
    private httpSuccess: HttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles HTTP request to create a new order.
   * @async
   * @param {HttpRequest} httpRequest - The HTTP request to handle.
   * @returns {Promise<IHttpResponse>} The promise resolves to the HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validates body parameters.
    if (
      httpRequest.body &&
      httpRequest.header &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const bodyParams = Object.keys(httpRequest.body)
      const headerParams = Object.keys(httpRequest.header)

      if (
        headerParams.includes('user_id') &&
        bodyParams.includes('orderExchanges') &&
        bodyParams.includes('orderSales') &&
        bodyParams.includes('total') &&
        bodyParams.includes('goldToCash') &&
        bodyParams.includes('discount') &&
        bodyParams.includes('description')
      ) {
        const user_id = (httpRequest.header as { user_id: number }).user_id
        const createOrderRequestDTO = httpRequest.body as {
          orderExchanges: IOrderExchangeInRequestDTO[]
          orderSales: IOrderSaleInRequestDTO[]
          total: number
          goldToCash: number
          discount: number
          description: string
        }

        // Executes the create order use case.
        response = await this.createOrderUseCase.execute(user_id, {
          ...createOrderRequestDTO,
          staff: {
            id: -1,
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
          },
          isChecked: false,
        })
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error.
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Create order failed, return a 400 Bad Request error.
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Create order succeeded, return a 201 Created response.
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error.
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
