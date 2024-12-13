import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AssetDTO } from '../Asset/Asset'

@Entity('cash_drawers')
export class CashDrawerDTO {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, name: 'drawer_name', unique: true })
  drawerName: string

  @Column({ nullable: false, name: 'drawer_type' })
  drawerType: string

  @OneToMany(() => AssetDTO, (asset) => asset.cashDrawer)
  assets: Promise<AssetDTO[]>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
