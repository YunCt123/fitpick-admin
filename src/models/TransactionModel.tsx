import type { User } from "@/models/UserModel";

export interface PaymentResponse {
  paymentid: number;
  userid: number;
  orderCode: number;
  paymentLinkId: string;
  amount: number;
  description: string;
  status: string;
  transactionDatetime: string; // ISO date
  checkoutUrl: string;
  createdat: string;
  updatedat: string;
  user: User;
}

