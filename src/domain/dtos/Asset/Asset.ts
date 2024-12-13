import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { CashDrawerDTO } from '../CashDrawer/CashDrawer'
import { CashFlowDTO } from '../CashFlow/CashFlow'

@Entity('assets')
@Unique(['cashDrawer', 'assetType'])
@Check('"amount" >= 0')
export class AssetDTO {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => CashDrawerDTO, (cashDrawer) => cashDrawer.assets)
  @JoinColumn({
    name: 'drawer_id',
    referencedColumnName: 'id',
  })
  cashDrawer: CashDrawerDTO

  @Column({ name: 'asset_type', nullable: false })
  assetType: string

  @Column({ nullable: false, unsigned: true })
  amount: number

  @OneToMany(() => CashFlowDTO, (cashFlow) => cashFlow.asset)
  cashFlows: Promise<CashFlowDTO[]>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
