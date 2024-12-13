import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

@Entity('admin')
export class AdminDTO {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  password: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
