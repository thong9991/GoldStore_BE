import { ICreateAdminRequestDTO } from '../dtos/Admin/CreateAdmin'
import { IUpdateAdminRequestDTO } from '../dtos/Admin/UpdateAdmin'

/**
 * Interface representing the structure of a admin.
 * @interface
 */
export interface AdminInterface {
  email: string
  username: string
  password: string
}

/**
 * Class representing a admin.
 * @class
 */
export class AdminEntity {
  private _email: string
  private _username: string
  private _password: string

  /**
   * Create an instance of AdminEntity.
   * @constructor
   * @param {AdminInterface} props - The properties of the admin.
   */
  constructor(props: AdminInterface) {
    this._email = props.email
    this._username = props.username
    this._password = props.password
  }

  /**
   * Create a new admin instance with provided data.
   * @static
   * @param {ICreateAdminRequestDTO} data - The data to create a admin.
   * @returns {AdminEntity} The created admin instance.
   */
  static create({
    email,
    username,
    password,
  }: ICreateAdminRequestDTO): AdminEntity {
    return new AdminEntity({ email, username, password })
  }

  /**
   * Update the admin instance with provided data.
   * @static
   * @param {IUpdateAdminRequestDTO} updatedAdmin - The data to update a admin.
   * @returns {IUpdateAdminRequestDTO} The updated admin instance.
   */
  static update(updatedAdmin: IUpdateAdminRequestDTO): IUpdateAdminRequestDTO {
    return updatedAdmin
  }

  /**
   * Gets the administrator's email.
   * @readonly
   */
  get email(): string {
    return this._email
  }

  /**
   * Gets the administrator's username.
   * @readonly
   */
  get username(): string {
    return this._username
  }

  /**
   * Gets the administrator's password.
   * @readonly
   */
  get password(): string {
    return this._password
  }
}
