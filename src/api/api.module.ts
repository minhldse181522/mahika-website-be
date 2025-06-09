import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';


@Module({
  imports: [HomeModule, UserModule, PaymentModule],
})
export class ApiModule {}
