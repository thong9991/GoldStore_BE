import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { StaffDTO } from '../Staff/Staff'
import { NotificationDTO } from '../Notification/Notification'

@Entity('users')
export class UserDTO {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: 'user' })
  role: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  password: string

  @Column({ name: 'fcm_token', default: '' })
  fcmToken: string

  @ManyToOne(() => StaffDTO, (staff) => staff.users)
  @JoinColumn({
    name: 'staff_id',
    referencedColumnName: 'id',
  })
  staff: StaffDTO

  @OneToMany(() => NotificationDTO, (notification) => notification.user)
  notifications: Promise<NotificationDTO[]>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
