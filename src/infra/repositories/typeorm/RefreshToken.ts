import dayjs from 'dayjs'
import { IRefreshTokenRepository } from '../../../app/repositories/RefreshToken'
import {
  IRefreshTokenDTO,
  RefreshTokenDTO,
} from '../../../domain/dtos/Authenticate/RefreshToken'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the refresh token repository.
 * @class
 * @implements {RefreshToken}
 */
export class RefreshTokenRepository implements IRefreshTokenRepository {
  /**
   * Creates a new refresh token.
   * @async
   * @param {number} user_id - The ID of the user to create refresh token.
   * @returns {Promise<IRefreshTokenDTO>} The created refresh token.
   */
  async create(user_id: number): Promise<IRefreshTokenDTO> {
    const refreshTokenRepository = AppDataSource.getRepository(RefreshTokenDTO)

    const expiresIn = dayjs()
      .add(user_id < 0 ? 1 : 2, 'hour')
      .unix()
    const refreshToken = refreshTokenRepository.create({
      user_id: user_id,
      expiresIn: expiresIn,
    })
    const results = await refreshTokenRepository.save(refreshToken)
    return results
  }

  /**
   * Deletes a refresh token by the ID of the user associated with the refresh token.
   * @async
   * @param {number} user_id - The ID of the user to delete refresh token.
   * @returns {Promise<void>} The promise that resolves when the user is deleted.
   */
  async delete(user_id: number): Promise<void> {
    const userRepository = AppDataSource.getRepository(RefreshTokenDTO)
    await userRepository.delete({ user_id: user_id })
  }

  /**
   * Finds a refresh token by its ID.
   * @async
   * @param {string} id - The ID of the refresh token to find.
   * @returns {Promise<IRefreshTokenDTO|unknown>} The found refresh token or undefined.
   */
  async findById(id: string): Promise<IRefreshTokenDTO | unknown> {
    const refreshTokenRepository = AppDataSource.getRepository(RefreshTokenDTO)
    const refreshToken = await refreshTokenRepository.findOneBy({
      id: id,
    })
    return refreshToken
  }

  /**
   * Finds a user by username.
   * @async
   * @param {number} user_id - The ID of the user to find.
   * @returns {Promise<IRefreshTokenDTO|unknown>} The found refresh token or undefined.
   */
  async findByUserId(user_id: number): Promise<IRefreshTokenDTO | unknown> {
    const refreshTokenRepository = AppDataSource.getRepository(RefreshTokenDTO)
    const refreshToken = await refreshTokenRepository.findOneBy({
      user_id: user_id,
    })
    return refreshToken
  }
}
