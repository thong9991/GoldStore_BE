import { IGoldPriceInRequestDTO } from '../dtos/GoldPrice/GoldPriceIn'
import { ICreateProductRequestDTO } from '../dtos/Product/CreateProduct'
import { ProductCategory } from '../dtos/Product/Product'
import { IUpdateProductRequestDTO } from '../dtos/Product/UpdateProduct'
import { IVendorInRequestDTO } from '../dtos/Vendor/VendorIn'

/**
 * Interface representing the structure of a product.
 * @interface
 */
export interface ProductInterface {
  productName: string
  category: ProductCategory
  goldPrice: IGoldPriceInRequestDTO
  totalWeight: number
  goldWeight: number
  gemWeight: number
  wage: number
  vendor: IVendorInRequestDTO
}

/**
 * Class representing a product.
 * @class
 */
export class ProductEntity {
  private _productName: string
  private _category: ProductCategory
  private _goldPrice: IGoldPriceInRequestDTO
  private _totalWeight: number
  private _goldWeight: number
  private _gemWeight: number
  private _wage: number
  private _vendor: IVendorInRequestDTO

  /**
   * Create an instance of ProductEntity.
   * @constructor
   * @param {ProductInterface} props - The properties of the product.
   */
  constructor(props: ProductInterface) {
    this._productName = props.productName
    this._category = props.category
    this._goldPrice = props.goldPrice
    this._totalWeight = props.totalWeight
    this._goldWeight = props.goldWeight
    this._gemWeight = props.gemWeight
    this._wage = props.wage
    this._vendor = props.vendor
  }

  /**
   * Create a new product instance with provided data.
   * @static
   * @param {ICreateProductRequestDTO} data - The data to create a product.
   * @returns {ProductEntity} The created product instance.
   */
  static create({
    productName,
    category,
    goldPrice,
    totalWeight,
    goldWeight,
    gemWeight,
    wage,
    vendor,
  }: ICreateProductRequestDTO): ProductEntity {
    return new ProductEntity({
      productName: productName,
      category: category,
      goldPrice: goldPrice,
      totalWeight: totalWeight,
      goldWeight: goldWeight,
      gemWeight: gemWeight,
      wage: wage,
      vendor: vendor,
    })
  }

  /**
   * Update the product instance with provided data.
   * @static
   * @param {IUpdateProductRequestDTO} updatedProduct - The data to update a product.
   * @returns {IUpdateProductRequestDTO} The updated product instance.
   */
  static update(
    updatedProduct: IUpdateProductRequestDTO
  ): IUpdateProductRequestDTO {
    return updatedProduct
  }

  /**
   * Gets the product's name.
   * @readonly
   */
  get productName(): string {
    return this._productName
  }

  /**
   * Gets the product's category.
   * @readonly
   */
  get category(): ProductCategory {
    return this._category
  }

  /**
   * Gets the gold price associated with the product.
   * @readonly
   */
  get goldPrice(): IGoldPriceInRequestDTO {
    return this._goldPrice
  }

  /**
   * Gets the product's total weight.
   * @readonly
   */
  get totalWeight(): number {
    return this._totalWeight
  }

  /**
   * Gets the product's gold weight.
   * @readonly
   */
  get goldWeight(): number {
    return this._goldWeight
  }

  /**
   * Gets the product's gem weight.
   * @readonly
   */
  get gemWeight(): number {
    return this._gemWeight
  }

  /**
   * Gets the product's wage.
   * @readonly
   */
  get wage(): number {
    return this._wage
  }

  /**
   * Gets the vendor associated with the product.
   * @readonly
   */
  get vendor(): IVendorInRequestDTO {
    return this._vendor
  }
}
