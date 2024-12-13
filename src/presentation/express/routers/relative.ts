import { Request, Response, Router } from 'express'
import { createRelativeComposer } from '../../../infra/services/composers/Relative/createRelative'
import { deleteRelativeComposer } from '../../../infra/services/composers/Relative/deleteRelative'
import { getRelativeComposer } from '../../../infra/services/composers/Relative/getRelative'
import { updateRelativeComposer } from '../../../infra/services/composers/Relative/updateRelative'
import { expressAdapter } from '../../adapters/express'
import { ensureAdminAuthorized } from '../middlewares/ensureAdminAuthorized'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

/**
 * Router for handling relative-related routes.
 */
const relativeRoutes = Router()

/**
 * Endpoint to create a new relative (requires personal authentication).
 */
relativeRoutes.post(
  '/:user_id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createRelativeComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get relative information (requires admin authentication).
 */
relativeRoutes.get(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getRelativeComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update relative information (requires authentication).
 */
relativeRoutes.patch(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateRelativeComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a relative (requires admin authentication).
 */
relativeRoutes.delete(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteRelativeComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { relativeRoutes }
