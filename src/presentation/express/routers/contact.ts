import { Request, Response, Router } from 'express'
import { createContactComposer } from '../../../infra/services/composers/Contact/createContact'
import { deleteContactComposer } from '../../../infra/services/composers/Contact/deleteContact'
import { getContactComposer } from '../../../infra/services/composers/Contact/getContact'
import { getContactByIdsComposer } from '../../../infra/services/composers/Contact/getContactByIds'
import { getSearchDataComposer } from '../../../infra/services/composers/Contact/getSearchData'
import { updateContactComposer } from '../../../infra/services/composers/Contact/updateContact'
import { expressAdapter } from '../../adapters/express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureStaffAuthorized } from '../middlewares/ensureStaffAuthorized'

/**
 * Router for handling contact-related routes.
 */
const contactRoutes = Router()

/**
 * Endpoint to create a new contact (requires authentication).
 */
contactRoutes.post(
  '/',
  ensureStaffAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, createContactComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get contact information (requires authentication).
 */
contactRoutes.get(
  '/',
  ensureStaffAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getContactComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get contact search data (requires authentication).
 */
contactRoutes.get(
  '/search-data',
  ensureStaffAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getSearchDataComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to get contact information by ID list (requires authentication).
 */
contactRoutes.get(
  '/id-list',
  ensureStaffAuthorized,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getContactByIdsComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to update contact information (requires admin authentication).
 */
contactRoutes.patch(
  '/:id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateContactComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to delete a contact (requires admin authentication).
 */
contactRoutes.delete(
  '/:id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, deleteContactComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { contactRoutes }
