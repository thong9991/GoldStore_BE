import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { ContactDTO } from '../Contact/Contact'
import { StaffDTO } from '../Staff/Staff'

@Entity('relatives')
export class RelativeDTO {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => StaffDTO, (staff) => staff.relatives)
  @JoinColumn({
    name: 'staff_id',
    referencedColumnName: 'id',
  })
  staff: StaffDTO

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  relationship: string

  @OneToOne(() => ContactDTO)
  @JoinColumn({ name: 'contact_id' })
  contact: ContactDTO

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
