import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Uuid } from '../../../common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';

@Entity('payment')
export class Payment extends AbstractEntity {

  constructor(data?: Partial<Payment>) {
    super();
    Object.assign(this, data);
  }

  
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
  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  paidAt: Date;
  
}
