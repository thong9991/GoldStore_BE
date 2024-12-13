import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { GoldPriceDTO } from '../GoldPrice/GoldPrice'
import { OrderDetailsDTO } from '../OrderDetails/OrderDetails'

@Entity('order_exchanges')
export class OrderExchangeDTO {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => OrderDetailsDTO,
    (orderDetails) => orderDetails.orderExchanges
  )
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
  })
  orderDetails: OrderDetailsDTO

  @ManyToOne(() => GoldPriceDTO, (goldPrice) => goldPrice.orderExchanges)
  @JoinColumn({
    name: 'gold_type',
    referencedColumnName: 'goldType',
  })
  goldPrice: GoldPriceDTO

  @Column({
    type: 'decimal',
    nullable: false,
    precision: 5,
    scale: 3,
  })
  amount: number
}
