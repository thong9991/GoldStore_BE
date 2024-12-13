import { Request, Response, Router } from 'express'
import { createAssetComposer } from '../../../infra/services/composers/Asset/createAsset'
import { deleteAssetComposer } from '../../../infra/services/composers/Asset/deleteAsset'
import { getAssetComposer } from '../../../infra/services/composers/Asset/getAsset'
import { expressAdapter } from '../../adapters/express'
import { ensureAdminAuthorized } from '../middlewares/ensureAdminAuthorized'

/**
 * Router for handling asset-related routes.
 */
const assetRoutes = Router()

/**
 * Endpoint to create a new asset (requires admin authentication).
 */
assetRoutes.post(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createAssetComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get asset information (requires admin authentication).
 */
assetRoutes.get(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAssetComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a asset (requires admin authentication).
 */
assetRoutes.delete(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteAssetComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { assetRoutes }
