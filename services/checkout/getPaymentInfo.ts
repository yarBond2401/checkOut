import { IStandartPaymentData } from "@/models/paymentInfo/IStandartPaymentData";
import axios from "axios";

export const getPaymentInfo = async () => {
  const response = await axios.get<IStandartPaymentData>(`https://quickproject-72c0b705df0a.herokuapp.com/paymentInfo`);

  if (!response.data) throw new Error('Unable to fetch payment information');
  return response.data;
};
