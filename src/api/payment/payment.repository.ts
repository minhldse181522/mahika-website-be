import { Transaction } from '@/api/payment/entity/transaction.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentRepository {

     constructor(
    @InjectRepository(Transaction)
    private transcRepository: Repository<Transaction>,
    ) {}

   async savePaymentToDB(payload: any) {
  const {
    orderCode,
    amount,
    description,
    status,
    paidAt,
    transactionId,
  } = payload;

  const transaction = this.transcRepository.create({
    orderCode,
    amount,
    description,
    status,
    paidAt: new Date(paidAt),
    transactionId,
  });
  console.log('Transaction to save:', transaction);

  await this.transcRepository.save(transaction);
}

}