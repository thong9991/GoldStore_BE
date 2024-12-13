import { UserEntity } from './User'

/**
 * Interface representing the structure of the refresh token.
 * @interface
 */
export interface IRefreshTokenEntity {
  user_id: string
  user: UserEntity
  createdAt: Date
  expiresIn: Date
}

/**
 * Class representing a refresh token.
 * @class
 */
export class RefreshTokenEntity {
  private _user_id: string
  private _user: UserEntity
  private _expiresIn: Date
  private _createdAt: Date

  /**
   * Create an instance of RefreshTokenEntity.
   * @constructor
   * @param {IRefreshTokenEntity} props - The properties of the refresh token.
   */
  constructor(props: IRefreshTokenEntity) {
    this._user_id = props.user_id
    this._user = props.user
    this._createdAt = props.createdAt
    this._expiresIn = props.expiresIn
  }

  /**
   * Gets the token's userId.
   * @readonly
   */
  get user_id(): string {
    return this._user_id
  }

  /**
   * Gets the token's user.
   * @readonly
   */
  get user(): UserEntity {
    return this._user
  }

  /**
   * Gets the token's expiration time.
   * @readonly
   */
  get expiresIn(): Date {
    return this._expiresIn
  }
  /**
   * Gets the token's created date.
   * @readonly
   */
  get createdAt(): Date {
    return this._createdAt
  }
}
