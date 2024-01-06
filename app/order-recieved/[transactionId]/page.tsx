import React from 'react';
import StoreProvider from '@/providers/StoreProvider';
import OrderRecievedSection from './OrderRecievedSection';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { IOrderRecievedData } from '@/models/paymentInfo/IOrderRecievedData';

const getRecievedOrderDataById = async (transactionId: string) => {
  const request = await axios.get<IOrderRecievedData>(`https://quickproject-72c0b705df0a.herokuapp.com/payments/paymentsByOrderId?orderId=${transactionId}`);
  const response = request.data;
  if (response.data) {
    return response;
  } else {
    redirect('/');
  }
};

type Props = {
  params: {
    transactionId: string;
  };
};

const OrderRecievedPage: React.FC<Props> = async ({ params: { transactionId } }) => {
  const data = await getRecievedOrderDataById(transactionId);

  return (
    <StoreProvider>
      <OrderRecievedSection data={data.data} />
    </StoreProvider>
  );
};
export default OrderRecievedPage;
