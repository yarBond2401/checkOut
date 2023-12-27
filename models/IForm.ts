import { PaymentMethodEnum } from "./PaymentMethodEnum";

export interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  country: string;
  phoneNumber: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
  method: PaymentMethodEnum;
  isAgree: boolean;
  isSubscribe: boolean;
}
