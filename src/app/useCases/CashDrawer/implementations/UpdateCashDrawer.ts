import { CashDrawerDTO } from '../../../../domain/dtos/CashDrawer/CashDrawer'
import { IUpdateCashDrawerRequestDTO } from '../../../../domain/dtos/CashDrawer/UpdateCashDrawer'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { CashDrawerEntity } from '../../../../domain/entities/CashDrawer'
import { CashDrawerErrorType } from '../../../../domain/enums/cashDrawer/ErrorType'
import { ICashDrawerRepository } from '../../../repositories/CashDrawer'
import { IUpdateCashDrawerUseCase } from '../UpdateCashDrawer'

/**
 * Use case for updating cash drawer information.
 * @class
 * @implements {IUpdateCashDrawerUseCase}
 */
export class UpdateCashDrawerUseCase implements IUpdateCashDrawerUseCase {
  /**
   * Creates an instance of UpdateCashDrawerUseCase.
   * @constructor
   * @param {ICashDrawerRepository} cashDrawerRepository - The repository for the cash drawers data.
   */
  constructor(private cashDrawerRepository: ICashDrawerRepository) {}

  /**
   * Executes the update cash drawer use case.
   * @async
   * @param {number} drawerId - The ID of the cash drawer to be updated.
   * @param {IUpdateCashDrawerRequestDTO} requestData - The updated cash drawer information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    drawerId: number,
    { drawerName, drawerType }: IUpdateCashDrawerRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const cashDrawerExist = (await this.cashDrawerRepository.findById(
        drawerId
      )) as CashDrawerDTO | null

      if (!cashDrawerExist) {
        return {
          data: { error: CashDrawerErrorType.CashDrawerNotExist },
          success: false,
        }
      }

      const cashDrawerEntity = CashDrawerEntity.update({
        drawerName,
        drawerType,
      })
      const cashDrawer = await this.cashDrawerRepository.update(
        cashDrawerExist,
        cashDrawerEntity
      )

      return { data: cashDrawer, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
