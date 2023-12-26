'use client';

import styles from '../styles/payment.module.scss';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IForm } from '@/models/IForm';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import PricingPlan from '@/components/PricingPlan';
import OrderSummary from '@/components/OrderSummary';
import Payment from '@/components/Payment';

const HomePage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(PaymentMethodEnum.CREDIT_CARD);
  const [pricingPlan, setPricingPlan] = useState<PricingPlanEnum>(PricingPlanEnum.PAY_AS_GO);
  const [hours, setHours] = useState<number>(60);
  const [discountCode, setDiscountCode] = useState<string>('');
  // const [windowWidth, setWindowWidth] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({});

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    console.log('formData', data);
  };

  // const handleResize = () => {
  //   setWindowWidth(window.innerWidth);
  // };
  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [window.innerWidth]);

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        {window.innerWidth > 768 ? (
          <>
            <Payment register={register} errors={errors} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            <div className={styles.summary}>
              <div className={styles.summary__content}>
                <h3 className={styles.summary__title}>Order Summary</h3>
                <div className={styles.divider}></div>
                <PricingPlan pricingPlan={pricingPlan} setPricingPlan={setPricingPlan} hours={hours} setHours={setHours} />
                <OrderSummary setDiscountCode={setDiscountCode} discountCode={discountCode} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.summary}>
              <div className={styles.summary__content}>
                <h3 className={styles.summary__title}>Pricing Plan</h3>
                <div className={styles.divider}></div>
                <PricingPlan pricingPlan={pricingPlan} setPricingPlan={setPricingPlan} hours={hours} setHours={setHours} />
                <Payment register={register} errors={errors} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                <h3 className={styles.summary__title}>Order summary</h3>
                <div className={styles.divider}></div>
                <OrderSummary setDiscountCode={setDiscountCode} discountCode={discountCode} />
              </div>
            </div>
          </>
        )}
      </form>
    </section>
  );
};
export default HomePage;
