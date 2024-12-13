import { ICreateCashDrawerRequestDTO } from '../../../../domain/dtos/CashDrawer/CreateCashDrawer'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { CashDrawerEntity } from '../../../../domain/entities/CashDrawer'
import { ICashDrawerRepository } from '../../../repositories/CashDrawer'
import { ICreateCashDrawerUseCase } from '../CreateCashDrawer'

/**
 * Use case for creating a new cash drawer.
 * @class
 * @implements {ICreateCashDrawerUseCase}
 */
export class CreateCashDrawerUseCase implements ICreateCashDrawerUseCase {
  /**
   * Creates an instance of CreateCashDrawerUseCase.
   * @constructor
   * @param {ICashDrawerRepository} cashDrawerRepository - The repository for the cash drawers data.
   */
  constructor(private cashDrawerRepository: ICashDrawerRepository) {}

  /**
   * Executes the create cash drawer use case.
   * @async
   * @param {ICreateCashDrawerRequestDTO} data - The creating cash drawer request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    drawerName,
    drawerType,
  }: ICreateCashDrawerRequestDTO): Promise<ResponseDTO> {
    try {
      const cashDrawerEntity = CashDrawerEntity.create({
        drawerName,
        drawerType,
      })

      const cashDrawer =
        await this.cashDrawerRepository.create(cashDrawerEntity)

      return { data: cashDrawer, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
