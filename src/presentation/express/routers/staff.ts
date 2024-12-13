import { Request, Response, Router } from 'express'
import { createStaffComposer } from '../../../infra/services/composers/Staff/createStaff'
import { deleteStaffComposer } from '../../../infra/services/composers/Staff/deleteStaff'
import { getStaffComposer } from '../../../infra/services/composers/Staff/getStaff'
import { updateStaffComposer } from '../../../infra/services/composers/Staff/updateStaff'
import { expressAdapter } from '../../adapters/express'
import { ensureAdminAuthorized } from '../middlewares/ensureAdminAuthorized'

/**
 * Router for handling staff-related routes.
 */
const staffRoutes = Router()

/**
 * Endpoint to create a new staff (requires admin authentication).
 */
staffRoutes.post(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createStaffComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get staff information (requires admin authentication).
 */
staffRoutes.get(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getStaffComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update staff information (requires admin authentication).
 */
staffRoutes.patch(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateStaffComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a staff (requires admin authentication).
 */
staffRoutes.delete(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteStaffComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { staffRoutes }
