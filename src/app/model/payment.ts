export interface Payment {
    transactionId: number;
    orderId: number;
    paymentDate:Date;
    username: string;
    amount: number;
    transactionStatus: string;

  }