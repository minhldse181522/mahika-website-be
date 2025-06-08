import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [HomeModule, UserModule],
})
export class ApiModule {}
