import * as dotenv from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { AdminDTO } from '../../../domain/dtos/Admin/Admin'
import { AssetDTO } from '../../../domain/dtos/Asset/Asset'
import { RefreshTokenDTO } from '../../../domain/dtos/Authenticate/RefreshToken'
import { CashDrawerDTO } from '../../../domain/dtos/CashDrawer/CashDrawer'
import { CashFlowDTO } from '../../../domain/dtos/CashFlow/CashFlow'
import { ContactDTO } from '../../../domain/dtos/Contact/Contact'
import { DimCategoryDTO } from '../../../domain/dtos/DimCategory/DimCategory'
import { DimDescriptionDTO } from '../../../domain/dtos/DimDescription/DimDescription'
import { DimGoldPriceDTO } from '../../../domain/dtos/DimGoldPrice/DimGoldPrice'
import { DimOrderDetailsDTO } from '../../../domain/dtos/DimOrderDetails/DimOrderDetails'
import { DimProductDTO } from '../../../domain/dtos/DimProduct/DimProduct'
import { DimStaffDTO } from '../../../domain/dtos/DimStaff/DimStaff'
import { DimVendorDTO } from '../../../domain/dtos/DimVendor/DimVendor'
import { FactOrderExchangeDTO } from '../../../domain/dtos/FactOrderExchange/FactOrderExchange'
import { FactOrderSaleDTO } from '../../../domain/dtos/FactOrderSale/FactOrderSale'
import { GoldPriceDTO } from '../../../domain/dtos/GoldPrice/GoldPrice'
import { NotificationDTO } from '../../../domain/dtos/Notification/Notification'
import { OrderDetailsDTO } from '../../../domain/dtos/OrderDetails/OrderDetails'
import { OrderExchangeDTO } from '../../../domain/dtos/OrderExchange/OrderExchange'
import { OrderSaleDTO } from '../../../domain/dtos/OrderSale/OrderSale'
import { ProductDTO } from '../../../domain/dtos/Product/Product'
import { RelativeDTO } from '../../../domain/dtos/Relative/Relative'
import { StaffDTO } from '../../../domain/dtos/Staff/Staff'
import { UserDTO } from '../../../domain/dtos/User/User'
import { VendorDTO } from '../../../domain/dtos/Vendor/Vendor'
import { GoldPriceEventSubscriber } from '../../repositories/typeorm/GoldPriceSubscriber'

dotenv.config()

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,

  DW_HOST,
  DW_PORT,
  DW_USERNAME,
  DW_PASSWORD,
  DW_DATABASE,
  DW_SCHEMA,
  NODE_ENV,
} = process.env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST || 'localhost',
  port: parseInt(DB_PORT || '5432'),
  username: DB_USERNAME || 'postgres',
  password: DB_PASSWORD || 'postgres',
  database: DB_DATABASE || 'postgres',
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  synchronize: true,
  cache: true,

  // synchronize: NODE_ENV === 'dev' ? false : false,
  // logging: NODE_ENV === 'dev' ? false : false,
  entities: [
    RefreshTokenDTO,
    NotificationDTO,
    AdminDTO,
    ContactDTO,
    RelativeDTO,
    UserDTO,
    StaffDTO,
    VendorDTO,
    GoldPriceDTO,
    ProductDTO,
    OrderSaleDTO,
    OrderExchangeDTO,
    OrderDetailsDTO,
    CashDrawerDTO,
    AssetDTO,
    CashFlowDTO,
  ],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [GoldPriceEventSubscriber],
})

export const DataWarehouse = new DataSource({
  type: 'postgres',
  host: DW_HOST || 'localhost',
  port: parseInt(DW_PORT || '5433'),
  username: DW_USERNAME || 'loader',
  password: DW_PASSWORD || 'loader',
  database: DW_DATABASE || 'MyDW',
  schema: DW_SCHEMA || 'core',
  // synchronize: true,
  // ssl: {
  //   rejectUnauthorized: false,
  // },

  // synchronize: NODE_ENV === 'dev' ? false : false,
  // logging: NODE_ENV === 'dev' ? false : false,
  entities: [
    DimGoldPriceDTO,
    DimVendorDTO,
    DimCategoryDTO,
    DimProductDTO,
    DimDescriptionDTO,
    DimStaffDTO,
    DimOrderDetailsDTO,

    FactOrderExchangeDTO,
    FactOrderSaleDTO,
  ],
  migrations: [__dirname + '/migration/*.ts'],
})
