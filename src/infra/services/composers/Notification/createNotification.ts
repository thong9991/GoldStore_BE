import { INotificationRepository } from '../../../../app/repositories/Notification'
import { IUserRepository } from '../../../../app/repositories/User'
import { ICreateNotificationUseCase } from '../../../../app/useCases/Notification/CreateNotification'
import { CreateNotificationUseCase } from '../../../../app/useCases/Notification/implementations/CreateNotification'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CreateNotificationController } from '../../../../presentation/http/controllers/Notification/implementations/CreateNotification'
import { NotificationRepository } from '../../../repositories/typeorm/Notification'
import { UserRepository } from '../../../repositories/typeorm/User'

/**
 * Composer function for creating and configuring the components required for notification creation.
 * @function
 * @returns {IController} The configured notification creation controller.
 */
export function createNotificationComposer(): IController {
  const notificationRepostory: INotificationRepository =
    new NotificationRepository()
  const userRepostory: IUserRepository = new UserRepository()
  const useCase: ICreateNotificationUseCase = new CreateNotificationUseCase(
    notificationRepostory,
    userRepostory
  )
  const controller: IController = new CreateNotificationController(useCase)
  return controller
}
