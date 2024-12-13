import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DimOrderDetailsDTO } from '../DimOrderDetails/DimOrderDetails'
import { DimProductDTO } from '../DimProduct/DimProduct'
import { DimGoldPriceDTO } from '../DimGoldPrice/DimGoldPrice'
import { DimVendorDTO } from '../DimVendor/DimVendor'

@Entity('fact_order_sales')
export class FactOrderSaleDTO {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => DimOrderDetailsDTO,
    (orderDetails) => orderDetails.orderSales
  )
  @JoinColumn({
    name: 'order_fk',
    referencedColumnName: 'orderPk',
  })
  orderDetails: DimOrderDetailsDTO

  @OneToOne(() => DimProductDTO)
  @JoinColumn({
    name: 'product_fk',
    referencedColumnName: 'productPk',
  })
  product: DimProductDTO

  @ManyToOne(() => DimGoldPriceDTO, (goldPrice) => goldPrice.orderSales)
  @JoinColumn({
    name: 'gold_price_fk',
    referencedColumnName: 'goldPricePk',
  })
  goldPrice: DimGoldPriceDTO

  @ManyToOne(() => DimVendorDTO, (vendor) => vendor.orderSales)
  @JoinColumn({
    name: 'vendor_fk',
    referencedColumnName: 'vendorPk',
  })
  vendor: DimVendorDTO

  @Column('decimal', {
    nullable: false,
    precision: 5,
    scale: 3,
    name: 'cut_amount',
  })
  cutAmount: number

  @Column({ nullable: false, name: 'new_wage' })
  newWage: number
}
