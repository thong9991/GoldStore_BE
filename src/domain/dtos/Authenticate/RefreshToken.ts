import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

/**
 * Data Transfer Object (DTO) representing the refresh token.
 * @interface
 */
export interface IRefreshTokenDTO {
  /**
   * The unique identifier for the refresh token.
   */
  id: string

  /**
   * The expiration time of the refresh token (in seconds).
   */
  expiresIn: number

  /**
   * The user id associated with the refresh token.
   */
  user_id: number

  /**
   * The creation timestamp of the refresh token.
   */
  createdAt: Date
}

@Entity('refresh_token')
export class RefreshTokenDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, name: 'expires_in' })
  expiresIn: number

  @Column({ nullable: false, unique: true })
  user_id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
