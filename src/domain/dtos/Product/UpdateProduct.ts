import { IGoldPriceInRequestDTO } from '../GoldPrice/GoldPriceIn'
import { IVendorInRequestDTO } from '../Vendor/VendorIn'
import { ProductCategory } from './Product'

/**
 * Data Transfer Object (DTO) representing the request to update a product.
 * @interface
 */
export interface IUpdateProductRequestDTO {
  /**
   * The updated name of the product.
   */
  productName?: string

  /**
   * The updated category of the product.
   */
  category?: ProductCategory

  /**
   * The updated gold price is associated with the product.
   */
  goldPrice?: IGoldPriceInRequestDTO

  /**
   * The updated total weight of the product.
   */
  totalWeight?: number

  /**
   * The updated gold weight of the product.
   */
  goldWeight?: number

  /**
   * The updated gem weight of the product.
   */
  gemWeight?: number

  /**
   * The updated reference wage of the product.
   */
  wage?: number

  /**
   * The updated vendor is associated with the product.
   */
  vendor?: IVendorInRequestDTO
}
