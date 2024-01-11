import React from 'react';
import AdminPannel from '@/modules/AdminPannel';
import axios from 'axios';
import { IOrderRecievedData } from '@/models/paymentInfo/IOrderRecievedData';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SessionProvider from '@/providers/SessionProvider';

const convertedObject = {
  data: {
    id: 24,
    transactionID: '7LU057686P196930G',
    dateTime: '2024-01-10T09:42:55.000Z',
    promoCode: '',
    orderTotal: 2446.37,
    platformFee: 47.968,
    paymentMethod: 'PayPal',
    pricingPlan: 'Pay As You Go',
    Email: 'star@gmail.com',
    createdAt: '2024-01-10T09:41:41.000Z',
    updatedAt: '2024-01-10T09:41:41.000Z',
    User: {
      id: 11,
      firstName: 'Nikita',
      lastName: 'Nikitosik',
      contactEmail: 'star@gmail.com',
      countryRegion: 'United States (US)',
      phone: '1234567876543',
      createdAt: '2024-01-10T05:49:25.000Z',
      updatedAt: '2024-01-10T05:49:25.000Z',
    },
  },
  message: 'success',
};

const AdminPannelPage = async () => {
  const ordersData = [convertedObject, convertedObject];

  return (
    <SessionProvider>
      <AdminPannel ordersData={ordersData} />
    </SessionProvider>
  );
};
export default AdminPannelPage;
