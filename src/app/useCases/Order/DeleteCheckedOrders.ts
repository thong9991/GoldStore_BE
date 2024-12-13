import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting checked orders.
 * @interface
 */
export interface IDeleteCheckedOrdersUseCase {
  /**
   * Executes the delete checked orders use case.
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(): Promise<ResponseDTO>
}
