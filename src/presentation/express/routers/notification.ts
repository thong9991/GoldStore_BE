import { Request, Response, Router } from 'express'
import { createNotificationComposer } from '../../../infra/services/composers/Notification/createNotification'
// import { getNotificationComposer } from '../../../infra/services/composers/Notification/getNotification'
import { expressAdapter } from '../../adapters/express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

/**
 * Router for handling notification-related routes.
 */
const notificationRoutes = Router()

/**
 * Endpoint to create a new notification (requires admin authentication).
 */
notificationRoutes.post(
  '/',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createNotificationComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get notification information (requires admin authentication).
 */
// notificationRoutes.get(
//   '/',
//   ensureAdminAuthorized,
//   async (request: Request, response: Response) => {
//     const adapter = await expressAdapter(request, getNotificationComposer())
//     return response.status(adapter.statusCode).json(adapter.body)
//   }
// )

export { notificationRoutes }
