import cors from 'cors'
import express from 'express'
import admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import serviceAccount from '../../../../secret/gold-store-eced9-firebase-adminsdk-z2o81-3d382436c4.json'
import {
  AppDataSource,
  DataWarehouse,
} from '../../../infra/database/typeorm/data_source'
import { adminUserRoutes } from '../routers/admin'
import { assetRoutes } from '../routers/asset'
import { authenticateRoutes } from '../routers/authenticate'
import { cashDrawerRoutes } from '../routers/cashDrawer'
import { cashFlowRoutes } from '../routers/cashFlow'
import { contactRoutes } from '../routers/contact'
import { goldPriceRoutes } from '../routers/goldPrice'
import { notificationRoutes } from '../routers/notification'
import { orderRoutes } from '../routers/order'
import { productRoutes } from '../routers/product'
import { profileRoutes } from '../routers/profile'
import { relativeRoutes } from '../routers/relative'
import { staffRoutes } from '../routers/staff'
import { userRoutes } from '../routers/user'
import { vendorRoutes } from '../routers/vendor'

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
DataWarehouse.initialize()
  .then(() => {
    console.log('Data Warehouse has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Warehouse initialization:', err)
  })

initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
  projectId: serviceAccount.project_id,
})

/**
 * Express application instance.
 */
const app = express()

/**
 * CORS options for allowing all origins.
 */
const corsOptions: cors.CorsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.json())

/**
 * Mounting routes for documentation, user-related, and authentication endpoints.
 */
app.use('/users', userRoutes)
app.use('/auth', authenticateRoutes)
app.use('/admin', adminUserRoutes)

app.use('/vendors', vendorRoutes)
app.use('/products', productRoutes)
app.use('/prices', goldPriceRoutes)
app.use('/orders', orderRoutes)
app.use('/drawers', cashDrawerRoutes)
app.use('/assets', assetRoutes)
app.use('/cash_flows', cashFlowRoutes)

app.use('/contacts', contactRoutes)
app.use('/staffs', staffRoutes)
app.use('/relatives', relativeRoutes)
app.use('/profile', profileRoutes)
app.use('/notifications', notificationRoutes)

export { app }
