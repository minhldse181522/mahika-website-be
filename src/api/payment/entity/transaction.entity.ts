import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Uuid } from '../../../common/types/common.type';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_transaction_id' })
  transactionId!: Uuid

  @Column()
  @IsNumber()
  orderCode: number;

  @Column()
  @IsNumber()
  amount: number;

  @Column()
  @IsString()
  description: string;

  @IsString()
  status: string;

  @Column({ type: 'timestamp' })
  paidAt: Date;
  
}
