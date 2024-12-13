import { Request, Response, Router } from 'express'
import { createAdminComposer } from '../../../infra/services/composers/Admin/createAdmin'
import { deleteAdminComposer } from '../../../infra/services/composers/Admin/deleteAdmin'
import { getAdminComposer } from '../../../infra/services/composers/Admin/getAdmin'
import { initAdminComposer } from '../../../infra/services/composers/Admin/initAdmin'
import { updateAdminComposer } from '../../../infra/services/composers/Admin/updateAdmin'
import { authenticateAdminComposer } from '../../../infra/services/composers/Authenticate/authenticateAdmin'
import { expressAdapter } from '../../adapters/express'
import { ensureAdminAuthorized } from '../middlewares/ensureAdminAuthorized'

/**
 * Router for handling admin-related routes.
 */
const adminUserRoutes = Router()

/**
 * Endpoint to create a supper admin user.
 */
adminUserRoutes.post('/init', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, initAdminComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

/**
 * Endpoint to handle user login.
 */
adminUserRoutes.post('/login', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, authenticateAdminComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

/**
 * Endpoint to create a new admin user.
 */
adminUserRoutes.post(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createAdminComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get admin user information (requires authentication).
 */
adminUserRoutes.get(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAdminComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update admin user information (requires authentication).
 */
adminUserRoutes.patch(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateAdminComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a admin user (requires authentication).
 */
adminUserRoutes.delete(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteAdminComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { adminUserRoutes }
