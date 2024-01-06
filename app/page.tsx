import MainSection from '@/components/MainSection';
import React from 'react';
import StoreProvider from '../providers/StoreProvider';
import axios from 'axios';
import { IStandartPaymentData } from '@/models/paymentInfo/IStandartPaymentData';

const getPaymentInfo = async () => {
  const response = await axios.get<IStandartPaymentData>(`https://quickproject-72c0b705df0a.herokuapp.com/paymentInfo`);

  if (!response.data) throw new Error('Unable to fetch payment information'); 
  return response.data
};

const HomePage: React.FC = async () => {
  const standartPaymentData = await getPaymentInfo();

  return (
    <StoreProvider>
      <MainSection standartPaymentData={standartPaymentData} />
    </StoreProvider>
  );
};
export default HomePage;
