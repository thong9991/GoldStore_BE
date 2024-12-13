import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import { DimDescriptionDTO } from '../DimDescription/DimDescription'
import { DimStaffDTO } from '../DimStaff/DimStaff'
import { FactOrderExchangeDTO } from '../FactOrderExchange/FactOrderExchange'
import { FactOrderSaleDTO } from '../FactOrderSale/FactOrderSale'

@Entity('dim_order_details')
export class DimOrderDetailsDTO {
  @PrimaryColumn({ name: 'order_pk' })
  orderPk: number

  @Column({ name: 'order_id' })
  orderId: number

  @Column({ type: 'bigint', name: 'transaction_time' })
  transactionTime: number

  @ManyToOne(() => DimStaffDTO, (staff) => staff.orderDetails)
  @JoinColumn({ name: 'staff_fk', referencedColumnName: 'staffPk' })
  staff: DimStaffDTO

  @ManyToOne(() => DimDescriptionDTO, (description) => description.orderDetails)
  @JoinColumn({ name: 'description_fk', referencedColumnName: 'descriptionPk' })
  description: DimDescriptionDTO

  @OneToMany(
    () => FactOrderExchangeDTO,
    (orderExchange) => orderExchange.orderDetails
  )
  orderExchanges: Promise<FactOrderExchangeDTO[]>

  @OneToMany(() => FactOrderSaleDTO, (orderSale) => orderSale.orderDetails)
  orderSales: Promise<FactOrderSaleDTO[]>

  @Index()
  @Column({ nullable: false })
  total: number

  @Column({ nullable: false, name: 'gold_to_cash' })
  goldToCash: number

  @Column({ nullable: false })
  discount: number
}
