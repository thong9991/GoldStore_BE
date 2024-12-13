import { ResponseDTO } from '../../../../domain/dtos/Response'
import { RelativeErrorType } from '../../../../domain/enums/relative/ErrorType'
import { IRelativeRepository } from '../../../repositories/Relative'
import { IGetAllRelativeUseCase } from '../GetAllRelative'

/**
 * Use case for retrieving all relatives.
 * @class
 * @implements {IGetAllRelativeUseCase}
 */
export class GetAllRelativeUseCase implements IGetAllRelativeUseCase {
  /**
   * Creates an instance of GetAllRelativeUseCase.
   * @constructor
   * @param {IRelativeRepository} relativeRepository - The repository for relative data.
   */
  constructor(private relativeRepository: IRelativeRepository) {}

  /**
   * Executes the retrieve all relatives use case.
   * @async
   * @param {number} page - The page number of pagination.
   * @returns {ResponseDTO} The response data.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const relatives = await this.relativeRepository.findAll(page)

      if (relatives.total == 0) {
        return {
          data: { error: RelativeErrorType.RelativeNotFound },
          success: false,
        }
      }

      return { data: relatives, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
