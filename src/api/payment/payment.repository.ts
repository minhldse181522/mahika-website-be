import { Payment} from '@/api/payment/entity/payment.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentRepository extends Repository<Payment>{

    constructor(private readonly dataSource: DataSource) {
        super(Payment, dataSource.createEntityManager());
      }

}