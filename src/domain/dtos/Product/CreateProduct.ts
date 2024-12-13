import { IGoldPriceInRequestDTO } from '../GoldPrice/GoldPriceIn'
import { IVendorInRequestDTO } from '../Vendor/VendorIn'
import { ProductCategory } from './Product'

/**
 * Data Transfer Object (DTO) representing the request to create a product.
 * @interface
 */
export interface ICreateProductRequestDTO {
  /**
   * The name of the product.
   */
  productName: string

  /**
   * The category of the product.
   */
  category: ProductCategory

  /**
   * The gold price is associated with the product.
   */
  goldPrice: IGoldPriceInRequestDTO

  /**
   * The total weight of the product.
   */
  totalWeight: number

  /**
   * The gold weight of the product.
   */
  goldWeight: number

  /**
   * The gem weight of the product.
   */
  gemWeight: number

  /**
   * The reference wage of the product.
   */
  wage: number

  /**
   * The vendor is associated with the product.
   */
  vendor: IVendorInRequestDTO
}
