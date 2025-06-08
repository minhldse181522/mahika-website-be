import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "./payment.repository";
import { PaymentRequestDTO } from "@/api/payment/dto/payment-request.dto";
import PayOS from '@payos/node';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {

  constructor(public paymentRepo: PaymentRepository) {}

  async createPayment(paymentRequestDTO: PaymentRequestDTO) {
    const payOS = new PayOS(process.env.CLIENT_ID, process.env.API_KEY,process.env.CHECKSUM_KEY);
    const orderPayOS = {
      orderCode: 123,
      amount: paymentRequestDTO.price,
      description: paymentRequestDTO.description,
      returnUrl: 'https://www.youtube.com/watch?v=a_kq2ueesoc', 
      cancelUrl: 'https://example.com/cancel', 
    };
    const paymentLink = await payOS.createPaymentLink(orderPayOS);
    // trả ra link thanh toán để fe redirect đến trang thanh toán
    return paymentLink.checkoutUrl; 
  }

  async handleWebhook(payload: any, signature: string) {
    const isValid = this.verifySignature(payload, signature);
    if (!isValid) {
      return { status: 'invalid signature' };
    }

    await this.paymentRepo.savePaymentToDB(payload);
    return { status: 'save transaction to database successfully' };
  } 

  verifySignature(payload: any, signature: string): boolean {
    const rawBody = JSON.stringify(payload);
    const hmac = crypto
      .createHmac('sha256', process.env.CHECKSUM_KEY) // replace with actual checksum key
      .update(rawBody)
      .digest('hex');
    return hmac === signature;
  }
}