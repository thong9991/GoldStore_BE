import { Request, Response, Router } from 'express'
import { createGoldPriceComposer } from '../../../infra/services/composers/GoldPrice/createGoldPrice'
import { deleteGoldPriceComposer } from '../../../infra/services/composers/GoldPrice/deleteGoldPrice'
import { getGoldPriceComposer } from '../../../infra/services/composers/GoldPrice/getGoldPrice'
import { updateAllGoldPriceComposer } from '../../../infra/services/composers/GoldPrice/updateAllGoldPrice'
import { updateGoldPriceComposer } from '../../../infra/services/composers/GoldPrice/updateGoldPrice'
import { expressAdapter } from '../../adapters/express'
import { ensureAdminAuthorized } from '../middlewares/ensureAdminAuthorized'
import { ensureStaffAuthorized } from '../middlewares/ensureStaffAuthorized'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

/**
 * Router for handling goldPrice-related routes.
 */
const goldPriceRoutes = Router()

/**
 * Endpoint to create a new gold price (requires admin authentication).
 */
goldPriceRoutes.post(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createGoldPriceComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get gold price information (requires authentication).
 */
goldPriceRoutes.get(
  '/',
  ensureStaffAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getGoldPriceComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update gold price information (requires personal authentication).
 */
goldPriceRoutes.patch(
  '/',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateAllGoldPriceComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update gold price information (requires admin authentication).
 */
goldPriceRoutes.patch(
  '/:goldType',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateGoldPriceComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a gold price (requires admin authentication).
 */
goldPriceRoutes.delete(
  '/:goldType',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteGoldPriceComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { goldPriceRoutes }
