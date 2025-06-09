import { PaymentRequestDTO } from "@/api/payment/dto/payment-request.dto";
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PaymentService } from "./payment.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('payment')
@Controller()
export class PaymentController {

 constructor(public paymentService: PaymentService) {}

  @Post('create')
  createPayment(@Body() paymentRequestDTO: PaymentRequestDTO) {
    return this.paymentService.createPayment(paymentRequestDTO);
  }

  // sau khi thanh toán xong, lấy dữ liệu để lưu vào db
  @Post('webhook')
  async handleWebhook(
    @Body() payload: any,
    @Headers('x-signature') signature: string,
  ) {
    return this.paymentService.handleWebhook(payload, signature);
  }

  
}