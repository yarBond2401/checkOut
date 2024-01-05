import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { OnApproveData, CreateOrderData } from '@paypal/paypal-js/types';
import axios from 'axios';
import useAppSelector from '@/hooks/use-app-selector';

const PaymentButton: React.FC = () => {
  const { paymentMethod, price, isSubscribe } = useAppSelector((state) => state.mainReducer);
  const serverUrl = 'http://localhost:5000';

  const createOrder = async (data: CreateOrderData) => {
    // Order is created on the server and the order id is returned
    try {
      const response = await axios.post(
        `${serverUrl}/api/orders`,
        {
          cart: {
            isSubscribed: isSubscribe,
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
      console.log('orderData', order);
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
      console.log('approveData', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  };

  return (
    <PayPalButtons
      style={{ color: 'blue', tagline: false, height: 35 }}
      fundingSource="paypal"
      createOrder={(data, actions) => createOrder(data)}
      onApprove={(data, actions) => onApprove(data)}
    />
  );
};

export default PaymentButton;
