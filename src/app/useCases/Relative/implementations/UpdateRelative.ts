import { RelativeDTO } from '../../../../domain/dtos/Relative/Relative'
import { IUpdateRelativeRequestDTO } from '../../../../domain/dtos/Relative/UpdateRelative'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { RelativeEntity } from '../../../../domain/entities/Relative'
import { RelativeErrorType } from '../../../../domain/enums/relative/ErrorType'
import { IRelativeRepository } from '../../../repositories/Relative'
import { IUpdateRelativeUseCase } from '../UpdateRelative'

/**
 * Use case for updating relative information.
 * @class
 * @implements {IUpdateRelativeUseCase}
 */
export class UpdateRelativeUseCase implements IUpdateRelativeUseCase {
  /**
   * Creates an instance of UpdateRelativeUseCase.
   * @constructor
   * @param {IRelativeRepository} relativeRepository - The repository for the relatives data.
   */
  constructor(private relativeRepository: IRelativeRepository) {}

  /**
   * Executes the update relative use case.
   * @async
   * @param {number} relativeId - The ID of the relative to be updated.
   * @param {IUpdateRelativeRequestDTO} requestData - The updated relative information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    relativeId: number,
    { name, relationship }: IUpdateRelativeRequestDTO
  ): Promise<ResponseDTO> {
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

      const relativeEntity = RelativeEntity.update({
        name,
        relationship,
      })
      const relative = await this.relativeRepository.update(
        relativeExist,
        relativeEntity
      )

      return { data: relative, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
