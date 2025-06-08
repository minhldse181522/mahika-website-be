import { IsNumber, IsString } from 'class-validator';

export class PaymentRequestDTO {
  @IsNumber()
  price: number;
  @IsString()
  description: string;
  @IsString()
  name: string;
}
