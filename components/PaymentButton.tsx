import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { OnApproveData, CreateOrderData } from '@paypal/paypal-js/types';
import axios from 'axios';
import useAppSelector from '@/hooks/use-app-selector';
import { IPostRequest } from '@/models/paymentInfo/IPostRequest';
import { useRouter } from 'next/navigation';
import { useAppSnakbar } from '@/hooks/use-app-snackbar';

const PaymentButton: React.FC = () => {
  const {
    paymentMethod,
    isSubscribe,
    formData: { firstName, lastName, email, country, phoneNumber },
  } = useAppSelector((state) => state.mainReducer);
  const {
    currentHours,
    totalPrice,
    pricingPlan,
    subtotalPrice,
    discountPrice,
    discountCodeText,
    standartPaymentData: { platformFee },
  } = useAppSelector((state) => state.pricingReducer);
  const { snackbarShow } = useAppSnakbar();
  const router = useRouter();

  const createOrder = async (data: CreateOrderData, totalPrice: number) => {
    try {
      const response = await axios.post(
        `https://quickproject-72c0b705df0a.herokuapp.com/userPayments/api/createOrder`,
        {
          cart: {
            isSubscribed: isSubscribe,
            method: paymentMethod,
            cost: totalPrice,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const order = response.data;
      return order.id;
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  };
  const onApprove = async (data: OnApproveData) => {
    try {
      const response = await axios.post(
        `https://quickproject-72c0b705df0a.herokuapp.com/userPayments/api/orders?orderId=${data.orderID}`,
        {
          orderID: data.orderID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        const promoCode = discountPrice !== 0 ? 'SomePromocode' : discountCodeText;
        const obj: IPostRequest = {
          userData: {
            firstName,
            lastName,
            contactEmail: email,
            countryRegion: country,
            phone: phoneNumber,
          },
          paymentData: {
            hours: currentHours,
            transactionId: data.orderID,
            dateTime: new Date(),
            promoCode,
            paymentMethod,
            pricingPlan,
            orderTotal: totalPrice,
            platformFee: (subtotalPrice * platformFee) / 100,
          },
        };

        const postRequest = await axios.post<{ data: { transactionId: number } }>(`https://quickproject-72c0b705df0a.herokuapp.com/userPayments`, obj);
        if (postRequest.data) {
          router.push(`/order-recieved/${postRequest.data.data.transactionId}`);
          return response.data;
        }
      }
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  };

  return (
    <PayPalButtons
      style={{ color: 'blue', tagline: false, height: 35 }}
      fundingSource="paypal"
      createOrder={(data, actions) => createOrder(data, totalPrice)}
      onApprove={(data, actions) => onApprove(data)}
    />
  );
};

export default PaymentButton;
