import { PaymentMethodEnum } from '../PaymentMethodEnum';
import { PricingPlanEnum } from '../PricingPlanEnum';

export interface IOrderData {
  id: number;
  transactionID: string;
  dateTime: string;
  promoCode: string;
  orderTotal: number;
  platformFee: number;
  paymentMethod: string;
  pricingPlan: string;
  Email: string;
  createdAt: string;
  updatedAt: string;
  hours?: number;
  User: {
    id: number;
    firstName: string;
    lastName: string;
    contactEmail: string;
    countryRegion: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IOrderRecievedData {
  data: IOrderData;
  message: string;
}
