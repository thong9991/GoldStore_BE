import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { ProductDTO } from '../Product/Product'

@Entity('vendors')
export class VendorDTO {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, name: 'vendor_name' })
  vendorName: string

  @Column({ nullable: false, name: 'vendor_code' })
  vendorCode: string

  @Column({ nullable: false, name: 'vendor_address' })
  vendorAddress: string

  @OneToMany(() => ProductDTO, (product) => product.vendor)
  products: Promise<ProductDTO[]>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
