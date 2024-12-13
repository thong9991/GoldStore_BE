import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DimGoldPriceDTO } from '../DimGoldPrice/DimGoldPrice'
import { DimOrderDetailsDTO } from '../DimOrderDetails/DimOrderDetails'

@Entity('fact_order_exchanges')
export class FactOrderExchangeDTO {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => DimOrderDetailsDTO,
    (orderDetails) => orderDetails.orderExchanges
  )
  @JoinColumn({
    name: 'order_fk',
    referencedColumnName: 'orderPk',
  })
  orderDetails: DimOrderDetailsDTO

  @ManyToOne(() => DimGoldPriceDTO, (goldPrice) => goldPrice.orderExchanges)
  @JoinColumn({
    name: 'gold_price_fk',
    referencedColumnName: 'goldPricePk',
  })
  goldPrice: DimGoldPriceDTO

  @Column({ nullable: false })
  amount: number
}
