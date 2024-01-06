import { PaymentMethodEnum } from "../PaymentMethodEnum";
import { PricingPlanEnum } from "../PricingPlanEnum";

export interface IPostRequest {
  userData: {
    firstName: string;
    lastName: string;
    contactEmail: string;
    countryRegion: string;
    phone: string;
  };
  paymentData: {
    hours: number;
    transactionId: string;
    dateTime: Date;
    promoCode: string;
    paymentMethod: PaymentMethodEnum;
    pricingPlan: PricingPlanEnum;
    orderTotal: number;
    platformFee: number;
  };
}
