import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { OrderExchangeDTO } from '../OrderExchange/OrderExchange'
import { ProductDTO } from '../Product/Product'

@Entity('gold_prices')
export class GoldPriceDTO {
  @PrimaryColumn({ nullable: false, name: 'gold_type' })
  goldType: string

  @Column({ nullable: false, name: 'ask_price' })
  askPrice: number

  @Column({ nullable: false, name: 'bid_price' })
  bidPrice: number

  @OneToMany(() => ProductDTO, (product) => product.goldPrice)
  products: Promise<ProductDTO[]>

  @OneToMany(() => OrderExchangeDTO, (orderExchange) => orderExchange.goldPrice)
  orderExchanges: Promise<OrderExchangeDTO[]>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
