export interface TipPayment {
  id: string;
  amount: number;
  method: string;
  timestamp: Date;
}

export interface Tip {
  id: string;
  totalAmount: number;
  splitCount: number;
  amountPerPerson: number;
  payments: TipPayment[];
  remainingAmount: number;
}
