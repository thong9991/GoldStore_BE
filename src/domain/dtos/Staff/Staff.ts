import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { OrderDetailsDTO } from '../OrderDetails/OrderDetails'
import { RelativeDTO } from '../Relative/Relative'
import { UserDTO } from '../User/User'

@Entity('staffs')
export class StaffDTO {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, name: 'f_name' })
  firstName: string

  @Column({ nullable: false, name: 'l_name' })
  lastName: string

  @Column({ nullable: false })
  phone: string

  @Column({ nullable: false })
  address: string

  @OneToMany(() => UserDTO, (user) => user.staff)
  users: Promise<UserDTO[]>

  @OneToMany(() => RelativeDTO, (relative) => relative.staff)
  relatives: Promise<RelativeDTO[]>

  @OneToMany(() => OrderDetailsDTO, (orderDetails) => orderDetails.staff)
  orderDetails: Promise<OrderDetailsDTO[]>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
