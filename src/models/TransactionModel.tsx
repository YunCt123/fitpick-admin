import type { User } from "@/models/UserModel";

// Transaction status constants
export const TransactionStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID'
} as const;

export type TransactionStatusType = typeof TransactionStatus[keyof typeof TransactionStatus];

export interface PaymentResponse {
  paymentid: number;
  userid: number;
  orderCode: number;
  paymentLinkId: string;
  amount: number;
  description: string;
  status: TransactionStatusType | string;
  transactionDatetime: string; // ISO date
  checkoutUrl: string;
  createdat: string;
  updatedat: string;
  user: User;
}

