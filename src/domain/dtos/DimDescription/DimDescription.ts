import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { DimOrderDetailsDTO } from '../DimOrderDetails/DimOrderDetails'

@Entity('dim_description')
export class DimDescriptionDTO {
  @PrimaryColumn({ name: 'description_pk' })
  descriptionPk: number

  @Column({ nullable: false })
  content: string

  @OneToMany(() => DimOrderDetailsDTO, (orderDetails) => orderDetails.staff)
  orderDetails: Promise<DimOrderDetailsDTO[]>
}
