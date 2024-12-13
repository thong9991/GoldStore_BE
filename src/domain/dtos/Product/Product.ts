import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm'
import { GoldPriceDTO } from '../GoldPrice/GoldPrice'
import { VendorDTO } from '../Vendor/Vendor'

export enum ProductCategory {
  RING = 'ring',
  NECKLACE = 'necklace',
  BRACELET = 'bracelet',
  OTHER = 'other',
}

@Entity('products')
export class ProductDTO {
  @PrimaryColumn()
  id: number

  @Column({ nullable: false, name: 'product_name' })
  productName: string

  @Column({
    type: 'enum',
    enum: ProductCategory,
    default: ProductCategory.OTHER,
    nullable: false,
  })
  category: ProductCategory

  @ManyToOne(() => GoldPriceDTO, (goldPrice) => goldPrice.products)
  @JoinColumn({
    name: 'gold_type',
    referencedColumnName: 'goldType',
  })
  goldPrice: GoldPriceDTO

  @Column({
    type: 'decimal',
    nullable: false,
    name: 'total_weight',
    precision: 5,
    scale: 3,
  })
  totalWeight: number

  @Column({
    type: 'decimal',
    nullable: false,
    name: 'gold_weight',
    precision: 5,
    scale: 3,
  })
  goldWeight: number

  @Column({
    type: 'decimal',
    nullable: false,
    name: 'gem_weight',
    precision: 4,
    scale: 3,
  })
  gemWeight: number

  @Column({ nullable: false })
  wage: number

  @ManyToOne(() => VendorDTO, (vendor) => vendor.products)
  @JoinColumn({
    name: 'vendor_id',
    referencedColumnName: 'id',
  })
  vendor: VendorDTO

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
