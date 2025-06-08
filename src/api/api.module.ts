import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { PaymentModule } from './payment/payment.module';


@Module({
  imports: [HomeModule, PaymentModule],
})
export class ApiModule {}
