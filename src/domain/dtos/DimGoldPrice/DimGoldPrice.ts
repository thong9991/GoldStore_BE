import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { FactOrderExchangeDTO } from '../FactOrderExchange/FactOrderExchange'
import { FactOrderSaleDTO } from '../FactOrderSale/FactOrderSale'

@Entity({ name: 'dim_gold_prices' })
export class DimGoldPriceDTO {
  @PrimaryGeneratedColumn({ name: 'gold_price_pk' })
  goldPricePk: number

  @Column({ nullable: false, name: 'gold_type' })
  goldType: string

  @Column({ nullable: false, name: 'ask_price' })
  askPrice: number

  @Column({ nullable: false, name: 'bid_price' })
  bidPrice: number

  @OneToMany(
    () => FactOrderExchangeDTO,
    (orderExchange) => orderExchange.goldPrice
  )
  orderExchanges: Promise<FactOrderExchangeDTO[]>

  @OneToMany(() => FactOrderSaleDTO, (orderSale) => orderSale.goldPrice)
  orderSales: Promise<FactOrderSaleDTO[]>

  @Column({ name: 'eff_time' })
  effTime: Date

  @Column({ name: 'exp_time' })
  expTime: Date
}
