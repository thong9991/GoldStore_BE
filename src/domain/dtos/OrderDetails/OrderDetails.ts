import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { OrderExchangeDTO } from '../OrderExchange/OrderExchange'
import { OrderSaleDTO } from '../OrderSale/OrderSale'
import { StaffDTO } from '../Staff/Staff'

@Entity('order_details')
export class OrderDetailsDTO {
  @PrimaryColumn('varchar', { length: 26 })
  id: string

  @ManyToOne(() => StaffDTO, (staff) => staff.orderDetails)
  @JoinColumn({ name: 'staff_id', referencedColumnName: 'id' })
  staff: StaffDTO

  @OneToMany(
    () => OrderExchangeDTO,
    (orderExchange) => orderExchange.orderDetails
  )
  orderExchanges: Promise<OrderExchangeDTO[]>

  @OneToMany(() => OrderSaleDTO, (orderSale) => orderSale.orderDetails)
  orderSales: Promise<OrderSaleDTO[]>

  @Column({ nullable: false })
  total: number

  @Column({ nullable: false, name: 'gold_to_cash' })
  goldToCash: number

  @Column({ nullable: false })
  discount: number

  @Column()
  description: string

  @Column({ name: 'is_checked', default: false })
  isChecked: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
