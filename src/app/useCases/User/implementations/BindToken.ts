import { getMessaging } from 'firebase-admin/messaging'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { UserDTO } from '../../../../domain/dtos/User/User'
import { UserEntity } from '../../../../domain/entities/User'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IUserRepository } from '../../../repositories/User'
import { IBindTokenUseCase } from '../BindToken'

/**
 * Use case for updating user fcm token.
 * @class
 * @implements {IBindTokenUseCase}
 */
export class BindTokenUseCase implements IBindTokenUseCase {
  /**
   * Creates an instance of BindTokenUseCase.
   * @constructor
   * @param {IUserRepository} userRepository - The repository for the users data.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executes the update user use case.
   * @async
   * @param {number} userId - The ID of the user to be updated.
   * @param {string} fcmToken - The updated user fcm token.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(userId: number, fcmToken: string): Promise<ResponseDTO> {
    try {
      const userExist = (await this.userRepository.findById(
        userId
      )) as UserDTO | null

      if (!userExist) {
        return {
          data: { error: UserErrorType.UserNotExist },
          success: false,
        }
      }

      if (userExist.fcmToken == fcmToken) {
        return { data: { fcmToken }, success: true }
      }

      if (userExist.fcmToken) {
        await getMessaging()
          .unsubscribeFromTopic(userExist.fcmToken, 'goldPrice')
          .then((response) => {
            console.log('Successfully removed token from topic:', response)
          })
          .catch((error) => {
            console.log('Error removed token from topic:', error)
          })
      }

      const userEntity = UserEntity.update({
        fcmToken,
      })

      await this.userRepository.update(userExist, userEntity)

      getMessaging()
        .subscribeToTopic(fcmToken, 'goldPrice')
        .then((response) => {
          console.log('Successfully subscribed to topic:', response)
        })
        .catch((error) => {
          console.log('Error subscribing to topic:', error)
        })

      return { data: { fcmToken }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
