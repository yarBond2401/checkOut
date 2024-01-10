'use client';
import React from 'react';
import OrderList from './components/OrderList';
import { IOrderRecievedData } from '@/models/paymentInfo/IOrderRecievedData';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface AdminPannelProps {
  ordersData: IOrderRecievedData[];
}
const AdminPannel: React.FC<AdminPannelProps> = ({ ordersData }) => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  return <OrderList ordersData={ordersData} />;
};
export default AdminPannel;
