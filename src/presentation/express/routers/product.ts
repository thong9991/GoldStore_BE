import { Request, Response, Router } from 'express'
import { createProductComposer } from '../../../infra/services/composers/Product/createProduct'
import { deleteProductComposer } from '../../../infra/services/composers/Product/deleteProduct'
import { getProductComposer } from '../../../infra/services/composers/Product/getProduct'
import { getProductByIdComposer } from '../../../infra/services/composers/Product/getProductById'
import { updateProductComposer } from '../../../infra/services/composers/Product/updateProduct'
import { expressAdapter } from '../../adapters/express'
import { ensureAdminAuthorized } from '../middlewares/ensureAdminAuthorized'
import { ensureStaffAuthorized } from '../middlewares/ensureStaffAuthorized'

/**
 * Router for handling product-related routes.
 */
const productRoutes = Router()

/**
 * Endpoint to create a new product (requires admin authorization).
 */
productRoutes.post(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createProductComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get product information (requires admin authentication).
 */
productRoutes.get(
  '/',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getProductComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get product information (requires authentication).
 */
productRoutes.get(
  '/:id',
  ensureStaffAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getProductByIdComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update product information (requires admin authentication).
 */
productRoutes.patch(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateProductComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a product (requires admin authentication).
 */
productRoutes.delete(
  '/:id',
  ensureAdminAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteProductComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { productRoutes }
