import { Request, Response, Router } from 'express'
import { createVendorComposer } from '../../../infra/services/composers/Vendor/createVendor'
import { deleteVendorComposer } from '../../../infra/services/composers/Vendor/deleteVendor'
import { getVendorComposer } from '../../../infra/services/composers/Vendor/getVendor'
import { updateVendorComposer } from '../../../infra/services/composers/Vendor/updateVendor'
import { expressAdapter } from '../../adapters/express'
import { ensureAdminAuthorized } from '../middlewares/ensureAdminAuthorized'

/**
 * Router for handling vendor-related routes.
 */
const vendorRoutes = Router()

/**
 * Endpoint to create a new vendor (requires admin authentication).
 */
vendorRoutes.post(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createVendorComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get vendor information (requires admin authentication).
 */
vendorRoutes.get(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getVendorComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update vendor information (requires admin authentication).
 */
vendorRoutes.patch(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateVendorComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a vendor (requires admin authentication).
 */
vendorRoutes.delete(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteVendorComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { vendorRoutes }
