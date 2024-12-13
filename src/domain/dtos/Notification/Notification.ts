import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserDTO } from '../User/User'

@Entity('notifications')
export class NotificationDTO {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  body: string

  @Column('jsonb', { nullable: false })
  data: { [key: string]: string }

  @ManyToOne(() => UserDTO, (user) => user.notifications)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserDTO

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
