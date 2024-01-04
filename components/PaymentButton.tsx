import React from 'react';
import {  PayPalButtons } from '@paypal/react-paypal-js';
import { OnApproveData, CreateOrderData } from '@paypal/paypal-js/types';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import axios from 'axios';

interface PaymentButtonProps {
  paymentMethod: PaymentMethodEnum;
  price: number;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({paymentMethod, price}) => {
  const serverUrl = 'http://localhost:5000';

  const createOrder = async (data: CreateOrderData) => {
    // Order is created on the server and the order id is returned
    try {
      const response = await axios.post(
        `${serverUrl}/api/orders`,
        {
          cart: {
            method: paymentMethod,
            cost: price,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const order = response.data;
      console.log('order', order);
      return order.id;
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  };
  const onApprove = async (data: OnApproveData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/orders/${data.orderID}/capture`,
        {
          orderID: data.orderID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('respose', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  };

  return <PayPalButtons style={{ color: 'blue', tagline: false, height: 35 }} fundingSource='paypal' createOrder={(data, actions) => createOrder(data)} onApprove={(data, actions) => onApprove(data)} />;
};

export default PaymentButton;