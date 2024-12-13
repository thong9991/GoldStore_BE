import { Request, Response, Router } from 'express'
import { createCashFlowComposer } from '../../../infra/services/composers/CashFlow/createCashFlow'
import { deleteCashFlowComposer } from '../../../infra/services/composers/CashFlow/deleteCashFlow'
import { getCashFlowComposer } from '../../../infra/services/composers/CashFlow/getCashFlow'
import { expressAdapter } from '../../adapters/express'
import { ensureAdminAuthorized } from '../middlewares/ensureAdminAuthorized'

/**
 * Router for handling cash flow statement-related routes.
 */
const cashFlowRoutes = Router()

/**
 * Endpoint to create a new cash flow statement (requires admin authentication).
 */
cashFlowRoutes.post(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createCashFlowComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get cash flow statement information (requires admin authentication).
 */
cashFlowRoutes.get(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getCashFlowComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a cash flow statement (requires admin authentication).
 */
cashFlowRoutes.delete(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteCashFlowComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { cashFlowRoutes }
