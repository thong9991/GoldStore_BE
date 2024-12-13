import { Request, Response, Router } from 'express'
import { changePasswordComposer } from '../../../infra/services/composers/Profile/changePassword'
import { deleteAccountComposer } from '../../../infra/services/composers/Profile/deleteAccount'
import { getProfileComposer } from '../../../infra/services/composers/Profile/getProfile'
import { updateAccountComposer } from '../../../infra/services/composers/Profile/updateAccount'
import { updateProfileComposer } from '../../../infra/services/composers/Profile/updateProfile'
import { bindTokenComposer } from '../../../infra/services/composers/User/bindToken'
import { expressAdapter } from '../../adapters/express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

/**
 * Router for handling vendor-related routes.
 */
const profileRoutes = Router()

/**
 * Endpoint to update staff profile (requires personal authentication).
 */
profileRoutes.patch(
  '/update_profile/:user_id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateProfileComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update account password (requires personal authentication).
 */
profileRoutes.patch(
  '/change_password/:user_id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, changePasswordComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update account username and email (requires personal authentication).
 */
profileRoutes.patch(
  '/update_account/:user_id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateAccountComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get staff information (requires personal authentication).
 */
profileRoutes.get(
  '/:user_id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getProfileComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a user (requires admin authentication).
 */
profileRoutes.delete(
  '/delete_account/:user_id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteAccountComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update account fcm token(requires personal authentication).
 */
profileRoutes.patch(
  '/bind_token/:user_id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, bindTokenComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { profileRoutes }
