import { IUserRepository } from '../../../app/repositories/User'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { ICreateUserRequestDTO } from '../../../domain/dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../../../domain/dtos/User/UpdateUser'
import { UserDTO } from '../../../domain/dtos/User/User'
import { IUserInRequestDTO } from '../../../domain/dtos/User/UserIn'
import { IUserOutRequestDTO } from '../../../domain/dtos/User/UserOut'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the user repository.
 * @class
 * @implements {IUserRepository}
 */
export class UserRepository implements IUserRepository {
  /**
   * Creates a new user.
   * @async
   * @param {ICreateUserRequestDTO} data - The user data.
   * @returns {Promise<IUserOutRequestDTO>} The created user.
   */
  async create(data: ICreateUserRequestDTO): Promise<IUserOutRequestDTO> {
    const userRepository = AppDataSource.getRepository(UserDTO)
    const user = userRepository.create(data)
    const results = await userRepository.save(user)
    return results
  }

  /**
   * Updates a user with new data.
   * @async
   * @param {IUserOutRequestDTO} user - The user to update.
   * @param {IUpdateUserRequestDTO} data - The updated user data.
   * @returns {Promise<IUserOutRequestDTO>} The updated user.
   */
  async update(
    user: IUserOutRequestDTO,
    data: IUpdateUserRequestDTO
  ): Promise<IUserOutRequestDTO> {
    const userRepository = AppDataSource.getRepository(UserDTO)
    const updatedUser = await userRepository
      .createQueryBuilder('user')
      .update(UserDTO)
      .set(data)
      .where('id = :id', { id: user.id })
      .returning(['id', 'role', 'email', 'username', 'password', 'updatedAt'])
      .updateEntity(true)
      .execute()
    return updatedUser.raw[0]
  }

  /**
   * Deletes a user by ID.
   * @async
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<void>} The promise that resolves when the user is deleted.
   */
  async delete(id: number): Promise<void> {
    const userRepository = AppDataSource.getRepository(UserDTO)
    await userRepository.delete({ id: id })
  }

  /**
   * Deletes the users by their staff ID.
   * @async
   * @param {number} staff_id - The staff ID of the users to be deleted.
   * @returns {Promise<void>} The promise that resolves when the user is deleted.
   */
  async deleteByStaffId(staff_id: number): Promise<void> {
    const userRepository = AppDataSource.getRepository(UserDTO)
    await userRepository.delete({ staff: { id: staff_id } })
  }

  /**
   * Finds a user by ID.
   * @async
   * @param {number} id - The ID of the user to find.
   * @returns {Promise<IUserInRequestDTO|unknown>} The found user or undefined.
   */
  async findById(id: number): Promise<IUserInRequestDTO | unknown> {
    const userRepository = AppDataSource.getRepository(UserDTO)
    const user = await userRepository.findOneBy({
      id: id,
    })
    return user
  }

  /**
   * Finds a user by username.
   * @async
   * @param {string} username - The username to search for.
   * @returns {Promise<IUserInRequestDTO|unknown>} The found user or undefined.
   */
  async findByUsername(username: string): Promise<IUserInRequestDTO | unknown> {
    const userRepository = AppDataSource.getRepository(UserDTO)
    const user = await userRepository.findOneBy({
      username: username,
    })
    return user
  }

  /**
   * Finds a user by email.
   * @async
   * @param {string} email - The email to search for.
   * @returns {Promise<IUserInRequestDTO|unknown>} The found user or undefined.
   */
  async findByEmail(email: string): Promise<IUserInRequestDTO | unknown> {
    const userRepository = AppDataSource.getRepository(UserDTO)
    const user = await userRepository.findOneBy({
      email: email,
    })
    return user
  }

  /**
   * Retrieves the list of fcm tokens.
   * @async
   * @returns {IContactInRequestDTO} The list of fcm tokens.
   */
  async findAllFcmToken(): Promise<IUserInRequestDTO[]> {
    const userRepository = AppDataSource.getRepository(UserDTO)
    const fcmTokens = await userRepository.find({
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        fcmToken: true,
      },
    })

    return fcmTokens
  }

  /**
   * Retrieves the paginated list of users.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of users.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4

    const userRepository = AppDataSource.getRepository(UserDTO)
    const [users, total] = await userRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        role: true,
        email: true,
        username: true,
        staff: {
          id: true,
          firstName: true,
          lastName: true,
        },
        createdAt: true,
        updatedAt: true,
      },
      relations: ['staff'],
    })

    return {
      body: users,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
