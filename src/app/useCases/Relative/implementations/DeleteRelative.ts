import { RelativeDTO } from '../../../../domain/dtos/Relative/Relative'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { RelativeErrorType } from '../../../../domain/enums/relative/ErrorType'
import { RelativeSuccessType } from '../../../../domain/enums/relative/SuccessType'
import { IRelativeRepository } from '../../../repositories/Relative'
import { IDeleteRelativeUseCase } from '../DeleteRelative'

/**
 * Use case for deleting relative.
 * @class
 * @implements {IDeleteRelativeUseCase}
 */
export class DeleteRelativeUseCase implements IDeleteRelativeUseCase {
  /**
   * Creating an instance of DeleteRelativeUseCase.
   * @constructor
   * @param {IRelativeRepository} relativeRepository - The repository for the relatives data.
   */
  constructor(private relativeRepository: IRelativeRepository) {}

  /**
   * Executes the delete relative use case.
   * @async
   * @param {number} relativeId - The ID of the relative to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(relativeId: number): Promise<ResponseDTO> {
    try {
      const relativeExist = (await this.relativeRepository.findById(
        relativeId
      )) as RelativeDTO | null

      if (!relativeExist) {
        return {
          data: { error: RelativeErrorType.RelativeNotExist },
          success: false,
        }
      }
      await this.relativeRepository.delete(relativeId)

      return {
        data: { msg: RelativeSuccessType.RelativeDeleted },
        success: true,
      }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
