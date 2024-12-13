import { ResponseDTO } from '../../../../domain/dtos/Response'
import { CashDrawerErrorType } from '../../../../domain/enums/cashDrawer/ErrorType'
import { ICashDrawerRepository } from '../../../repositories/CashDrawer'
import { IGetAllCashDrawerUseCase } from '../GetAllCashDrawer'

/**
 * Use case for retrieving all cash drawers.
 * @class
 * @implements {IGetAllCashDrawerUseCase}
 */
export class GetAllCashDrawerUseCase implements IGetAllCashDrawerUseCase {
  /**
   * Creates an instance of GetAllCashDrawerUseCase.
   * @constructor
   * @param {ICashDrawerRepository} cashDrawerRepository - The repository for cash drawer data.
   */
  constructor(private cashDrawerRepository: ICashDrawerRepository) {}

  /**
   * Executes the retrieve all cash drawers use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      if (page == -1) {
        const cashDrawers =
          await this.cashDrawerRepository.findAllDataNoPaging()
        return { data: cashDrawers, success: true }
      }

      const cashDrawers = await this.cashDrawerRepository.findAll(page)

      if (cashDrawers.total == 0) {
        return {
          data: { error: CashDrawerErrorType.CashDrawerNotFound },
          success: false,
        }
      }

      return { data: cashDrawers, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
