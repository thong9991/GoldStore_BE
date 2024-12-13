import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { DimOrderDetailsDTO } from '../DimOrderDetails/DimOrderDetails'

@Entity('dim_staffs')
export class DimStaffDTO {
  @PrimaryColumn({ name: 'staff_pk' })
  staffPk: number

  @Column({ name: 'staff_id' })
  staffId: number

  @Column({ nullable: false, name: 'f_name' })
  firstName: string

  @Column({ nullable: false, name: 'l_name' })
  lastName: string

  @Column({ nullable: false })
  phone: string

  @Column({ nullable: false })
  address: string

  @OneToMany(() => DimOrderDetailsDTO, (orderDetails) => orderDetails.staff)
  orderDetails: Promise<DimOrderDetailsDTO[]>
}
