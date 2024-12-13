import { IStaffInRequestDTO } from '../dtos/Staff/StaffIn'
import { ICreateUserRequestDTO } from '../dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../dtos/User/UpdateUser'

/**
 * Interface representing the structure of a user.
 * @interface
 */
export interface UserInterface {
  role: string
  email: string
  username: string
  password: string
  fcmToken?: string
  staff?: IStaffInRequestDTO
}

/**
 * Class representing a user.
 * @class
 */
export class UserEntity {
  private _role: string
  private _email: string
  private _username: string
  private _password: string
  private _fcmToken?: string
  private _staff?: IStaffInRequestDTO

  /**
   * Create an instance of UserEntity.
   * @constructor
   * @param {UserInterface} props - The properties of the user.
   */
  constructor(props: UserInterface) {
    this._role = props.role
    this._email = props.email
    this._username = props.username
    this._password = props.password
    this._fcmToken = props.fcmToken
    this._staff = props.staff
  }

  /**
   * Create a new user instance with provided data.
   * @static
   * @param {ICreateUserRequestDTO} data - The data to create a user.
   * @returns {UserEntity} The created user instance.
   */
  static create({
    role,
    email,
    username,
    password,
  }: ICreateUserRequestDTO): UserEntity {
    return new UserEntity({ role, email, username, password })
  }

  /**
   * Update the user instance with provided data.
   * @static
   * @param {IUpdateUserRequestDTO} updatedUser - The data to update a user.
   * @returns {IUpdateUserRequestDTO} The updated user instance.
   */
  static update(updatedUser: IUpdateUserRequestDTO): IUpdateUserRequestDTO {
    return updatedUser
  }

  /**
   * Gets the user's role.
   * @readonly
   */
  get role(): string {
    return this._role
  }

  /**
   * Gets the user's email.
   * @readonly
   */
  get email(): string {
    return this._email
  }

  /**
   * Gets the user's username.
   * @readonly
   */
  get username(): string {
    return this._username
  }

  /**
   * Gets the user's password.
   * @readonly
   */
  get password(): string {
    return this._password
  }

  /**
   * Gets the user's fcm token.
   * @readonly
   */
  get fcmToken(): string | unknown {
    return this._fcmToken
  }

  /**
   * Gets the staff information associated with the user.
   * @readonly
   */
  get staff(): IStaffInRequestDTO | unknown {
    return this._staff
  }
}
