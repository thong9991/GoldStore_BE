import { GoldPriceDTO } from '../GoldPrice/GoldPrice'
import { VendorDTO } from '../Vendor/Vendor'
import { ProductCategory } from './Product'

/**
 * Data Transfer Object (DTO) representing the output of product data.
 * @interface
 */
export interface IProductOutRequestDTO {
  /**
   * The ID of the product.
   */
  id: number

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
  goldPrice: GoldPriceDTO

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
  vendor: VendorDTO

  /**
   * The optional created date of the product.
   */
  createdAt?: Date

  /**
   * The optional updated date of the product.
   */
  updatedAt?: Date
}
