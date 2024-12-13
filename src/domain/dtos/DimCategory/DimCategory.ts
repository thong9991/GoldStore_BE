import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { DimProductDTO } from '../DimProduct/DimProduct'

@Entity('dim_category')
export class DimCategoryDTO {
  @PrimaryColumn({ name: 'category_pk' })
  categoryPk: number

  @Column({ name: 'category_name', nullable: false })
  categoryName: string

  @OneToMany(() => DimProductDTO, (product) => product.category)
  products: Promise<DimProductDTO[]>
}
