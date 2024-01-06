export interface IStandartPaymentData {
  id: number;
  hourly: number;
  monthly: number;
  platformFee: number;
  promocodes: {
    [key: string]: number;
  };
  createdAt: string;
  updatedAt: string;
}
