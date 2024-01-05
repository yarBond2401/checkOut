'use client';
import React from 'react';
import OrderRecievedSection from './PageContent';
import StoreProvider from '@/providers/StoreProvider';

const OrderRecievedPage: React.FC = ({}) => {
  return (
    <StoreProvider>
      <OrderRecievedSection />
    </StoreProvider>
  );
};
export default OrderRecievedPage;
