import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

export enum PhoneType {
  HOME = 'home',
  MOBILE = 'mobile',
}

@Entity('contacts')
export class ContactDTO {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({
    type: 'enum',
    enum: PhoneType,
    default: PhoneType.MOBILE,
    nullable: false,
    name: 'phone_type',
  })
  phoneType: PhoneType

  @Column({ nullable: false })
  phone: string

  @Column({ type: 'text' })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
