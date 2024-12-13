import { Request, Response, Router } from 'express'
import { createCashDrawerComposer } from '../../../infra/services/composers/CashDrawer/createCashDrawer'
import { deleteCashDrawerComposer } from '../../../infra/services/composers/CashDrawer/deleteCashDrawer'
import { getCashDrawerComposer } from '../../../infra/services/composers/CashDrawer/getCashDrawer'
import { updateCashDrawerComposer } from '../../../infra/services/composers/CashDrawer/updateCashDrawer'
import { expressAdapter } from '../../adapters/express'
import { ensureAdminAuthorized } from '../middlewares/ensureAdminAuthorized'

/**
 * Router for handling cash drawer-related routes.
 */
const cashDrawerRoutes = Router()

/**
 * Endpoint to create a new cash drawer (requires admin authentication).
 */
cashDrawerRoutes.post(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createCashDrawerComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get cash drawer information (requires admin authentication).
 */
cashDrawerRoutes.get(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getCashDrawerComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update cash drawer information (requires admin authentication).
 */
cashDrawerRoutes.patch(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateCashDrawerComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a cash drawer (requires admin authentication).
 */
cashDrawerRoutes.delete(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteCashDrawerComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { cashDrawerRoutes }
