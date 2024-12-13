import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AssetDTO } from '../Asset/Asset'

@Entity('cash_flow_statements')
export class CashFlowDTO {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => AssetDTO, (asset) => asset.cashFlows)
  @JoinColumn({
    name: 'asset_id',
    referencedColumnName: 'id',
  })
  asset: AssetDTO

  @Column({ nullable: false })
  amount: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
