import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderDetailsDTO } from '../OrderDetails/OrderDetails'
import { ProductDTO } from '../Product/Product'

@Entity('order_sales')
export class OrderSaleDTO {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => OrderDetailsDTO, (orderDetails) => orderDetails.orderSales)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
  })
  orderDetails: OrderDetailsDTO

  @OneToOne(() => ProductDTO)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: ProductDTO

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
