import { getMessaging } from 'firebase-admin/messaging'
import { ICreateNotificationRequestDTO } from '../../../../domain/dtos/Notification/CreateNotification'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'
import { NotificationEntity } from '../../../../domain/entities/Notification'
import { AuthenticateUserErrorType } from '../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { INotificationRepository } from '../../../repositories/Notification'
import { IUserRepository } from '../../../repositories/User'
import { ICreateNotificationUseCase } from '../CreateNotification'

/**
 * Use case for creating a new notification.
 * @class
 * @implements {ICreateNotificationUseCase}
 */
export class CreateNotificationUseCase implements ICreateNotificationUseCase {
  /**
   * Creates an instance of CreateNotificationUseCase.
   * @constructor
   * @param {INotificationRepository} notificationRepository - The repository for the notifications data.
   * @param {IUserRepository} userRepository - The repository for the users data.
   */
  constructor(
    private notificationRepository: INotificationRepository,
    private userRepository: IUserRepository
  ) {}

  /**
   * Executes the create notification use case.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {ICreateNotificationRequestDTO} data - The creating notification request.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    userId: number,
    { title, body, data }: ICreateNotificationRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findById(
        userId
      )) as IUserInRequestDTO | null

      if (!user) {
        return { data: { error: UserErrorType.UserNotExist }, success: false }
      }
      if (user.role != 'manager') {
        return {
          data: { error: AuthenticateUserErrorType.AccessDenied },
          success: false,
        }
      }
      console.log(JSON.stringify(data))

      const message = {
        topic: 'goldPrice',
        notification: {
          title: title,
          body: body,
        },
        data,
        // token:
        //   'cIfslwTFykkXiH5mOaR_Db:APA91bETwlUBzfFsBfzBqGRRSEy8ttkmJL45ZxEfDV7BZPTzNjHo9hDPysAkT6Cy1eJ1dpfdHmHZ7zstWlAuncfDp_U7ZXXnCZ6jvWCZunltAQjL2vaDo_o',
      }

      getMessaging()
        .send(message)
        .then((response) => {
          console.log('Successfully sent message:', response)
        })
        .catch((error) => {
          console.log('Error sending message:', error)
        })

      const notificationEntity = NotificationEntity.create({
        title,
        body,
        data,
        user,
      })
      const notification =
        await this.notificationRepository.create(notificationEntity)

      return { data: { notification }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
