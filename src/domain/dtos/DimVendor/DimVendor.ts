import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { FactOrderSaleDTO } from '../FactOrderSale/FactOrderSale'

@Entity('dim_vendors')
export class DimVendorDTO {
  @PrimaryGeneratedColumn({ name: 'vendor_pk' })
  vendorPk: number

  @Column({ name: 'vendor_id' })
  vendorId: number

  @Column({ nullable: false, name: 'vendor_name' })
  vendorName: string

  @Column({ nullable: false, name: 'vendor_code' })
  vendorCode: string

  @Column({ nullable: false, name: 'vendor_address' })
  vendorAddress: string

  @OneToMany(() => FactOrderSaleDTO, (orderSale) => orderSale.goldPrice)
  orderSales: Promise<FactOrderSaleDTO[]>
}
