'use client';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { OnApproveData, CreateOrderData } from '@paypal/paypal-js/types';
import styles from '../styles/main.module.scss';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IForm } from '@/models/IForm';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import PricingPlan from '@/components/PricingPlan';
import OrderSummary from '@/components/OrderSummary';
import Payment from '@/components/Payment';
import Snackbar from '@/components/Snackbar';
import clsx from 'clsx';
import Popup from '@/components/Popup';

const HomePage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(PaymentMethodEnum.CREDIT_CARD);
  const [pricingPlan, setPricingPlan] = useState<PricingPlanEnum>(PricingPlanEnum.PAY_AS_GO);
  const [hours, setHours] = useState<number>(10);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<any>();
  const [isAgree, setAgree] = useState<boolean>(false);
  const [isSubscribe, setSubscribe] = useState<boolean>(false);
  const [isPopup, setPopup] = useState<boolean>(false);
  const [isShowSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [submitClick, setSubmitClick] = useState<number>(0);
  const [price, setPrice] = useState<number>(20.000)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
  } = useForm<IForm>({ shouldFocusError: false });

  useEffect(() => {
    if (isShowSnackbar || Object.keys(errors).length > 0) {
      const section = document.getElementById('section');
      if (section) {
        section.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  }, [submitClick, errors]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  /* ============================================================================================================================= */

  const serverUrl = 'http://localhost:8888/';

  const initialOptions = {
    clientId: 'ClientIdFromUser',
    currency: 'USD',
    intent: 'capture',
  };

  const createOrder = async (data: CreateOrderData) => {
    // Order is created on the server and the order id is returned
    const response = await fetch(`${serverUrl}/my-server/create-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // используйте параметр «body», чтобы при необходимости передать дополнительную информацию о заказе
      // например, артикулы и количествo продуктов
      body: JSON.stringify({
        product: {
          description: 'THE_BEST_PRODUCT_NAME',
          cost: price,
        },
      }),
    });
    const order = await response.json();
    return order.id;
  };
  const onApprove = async (data: OnApproveData) => {
    // Order is captured on the server and the response is returned to the browser
    const response = await fetch(`${serverUrl}/my-server/capture-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });
    return await response.json();
  };

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (!isAgree) return setShowSnackbar(true);
    if (data.confirmEmail !== data.email) return setError('confirmEmail', { message: 'Email Adress Is Not Matched' });

    if (paymentMethod === PaymentMethodEnum.PAYPAL) {
      console.log('data', data);
    } else if (paymentMethod === PaymentMethodEnum.CREDIT_CARD) {
      setPopup(true);
      console.log('data', data);
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      {/* <section id="section" className={styles.section}>
        {isPopup && <Popup setPopup={setPopup} />}
        <div className={clsx(styles.container, { [styles.container__error]: Object.keys(errors).length > 0 || isShowSnackbar })}>
          {(isShowSnackbar || Object.keys(errors).length > 0) && (
            <Snackbar submitClick={submitClick} isAgree={isAgree} paymentMethod={paymentMethod} control={control} errors={errors} />
          )}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {windowWidth > 768 && (
              <>
                <Payment
                  setValue={setValue}
                  isAgree={isAgree}
                  isSubscribe={isSubscribe}
                  setSubscribe={setSubscribe}
                  setAgree={setAgree}
                  control={control}
                  register={register}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
                <div className={styles.summary}>
                  <div className={styles.summary__content}>
                    <h3 className={styles.summary__title}>Order Summary</h3>
                    <div className={styles.divider}></div>
                    <PricingPlan pricingPlan={pricingPlan} setPricingPlan={setPricingPlan} hours={hours} setHours={setHours} />
                    <OrderSummary
                      isAgree={isAgree}
                      setShowSnackbar={setShowSnackbar}
                      setSubmitClick={setSubmitClick}
                      setDiscountCode={setDiscountCode}
                      discountCode={discountCode}
                    />
                  </div>
                </div>
              </>
            )}
            {windowWidth <= 768 && (
              <>
                <div className={styles.summary}>
                  <div className={styles.summary__content}>
                    <h3 className={styles.summary__title}>Pricing Plan</h3>
                    <div className={styles.divider}></div>
                    <PricingPlan pricingPlan={pricingPlan} setPricingPlan={setPricingPlan} hours={hours} setHours={setHours} />
                    <Payment
                      setValue={setValue}
                      isAgree={isAgree}
                      isSubscribe={isSubscribe}
                      setSubscribe={setSubscribe}
                      setAgree={setAgree}
                      control={control}
                      register={register}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />
                    <h3 className={styles.summary__title}>Order summary</h3>
                    <div className={styles.divider}></div>
                    <OrderSummary
                      isAgree={isAgree}
                      setShowSnackbar={setShowSnackbar}
                      setSubmitClick={setSubmitClick}
                      setDiscountCode={setDiscountCode}
                      discountCode={discountCode}
                    />
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </section> */}
      <PayPalButtons createOrder={(data, actions) => createOrder(data)} onApprove={(data, actions) => onApprove(data)} />
    </PayPalScriptProvider>
  );
};
export default HomePage;
