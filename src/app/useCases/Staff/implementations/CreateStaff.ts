import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ICreateStaffRequestDTO } from '../../../../domain/dtos/Staff/CreateStaff'
import { StaffEntity } from '../../../../domain/entities/Staff'
import { IStaffRepository } from '../../../repositories/Staff'
import { ICreateStaffUseCase } from '../CreateStaff'

/**
 * Use case for creating a new staff.
 * @class
 * @implements {ICreateStaffUseCase}
 */
export class CreateStaffUseCase implements ICreateStaffUseCase {
  /**
   * Creates an instance of CreateStaffUseCase.
   * @constructor
   * @param {IStaffRepository} staffRepository - The repository for the staffs data.
   */
  constructor(private staffRepository: IStaffRepository) {}

  /**
   * Executes the create staff use case.
   * @async
   * @param {ICreateStaffRequestDTO} data - The creating staff request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    firstName,
    lastName,
    phone,
    address,
  }: ICreateStaffRequestDTO): Promise<ResponseDTO> {
    try {
      const staffEntity = StaffEntity.create({
        firstName,
        lastName,
        phone,
        address,
      })

      const staff = await this.staffRepository.create(staffEntity)

      return { data: staff, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
