import { StringField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PaymentRequestDTO {
  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'ABC'
  })
  @StringField()
  description: string;
  
  @ApiProperty()
  @IsString()
  name: string;
}
