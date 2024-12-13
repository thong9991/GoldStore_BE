import { Request, Response, Router } from 'express'
import { expressAdapter } from '../../adapters/express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { authenticateUserComposer } from '../../../infra/services/composers/Authenticate/authenticateUser'
import { recoverUserInformationComposer } from '../../../infra/services/composers/Authenticate/recoverUserInformation'
import { refreshTokenUserComposer } from '../../../infra/services/composers/Authenticate/refreshTokenUser'
import { refreshTokenComposer } from '../../../infra/services/composers/Authenticate/refreshToken'

/**
 * Router for handling authenticate-related routes.
 */
const authenticateRoutes = Router()

/**
 * Endpoint to handle user login.
 */
authenticateRoutes.post(
  '/login',
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, authenticateUserComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to handle refresh user token.
 */
authenticateRoutes.post(
  '/refresh-token',
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, refreshTokenUserComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to handle refresh user token.
 */
authenticateRoutes.get(
  '/refresh-token/:user_id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, refreshTokenComposer())
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

/**
 * Endpoint to recover the user information.
 */
authenticateRoutes.post(
  '/user/:user_id',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(
      request,
      recoverUserInformationComposer()
    )
    return response.status(adapter.statusCode).json(adapter.body)
  }
)

export { authenticateRoutes }
