import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { DimCategoryDTO } from '../DimCategory/DimCategory'

@Entity('dim_products')
export class DimProductDTO {
  @PrimaryColumn({ name: 'product_pk' })
  productPk: number

  @Column({ name: 'product_id' })
  productId: number

  @Column({ nullable: false, name: 'product_name' })
  productName: string

  @ManyToOne(() => DimCategoryDTO, (category) => category.products)
  @JoinColumn({ name: 'category_fk', referencedColumnName: 'categoryPk' })
  category: DimCategoryDTO

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
}
