'use client';

import { RiErrorWarningFill } from 'react-icons/ri';
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

const HomePage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(PaymentMethodEnum.CREDIT_CARD);
  const [pricingPlan, setPricingPlan] = useState<PricingPlanEnum>(PricingPlanEnum.PAY_AS_GO);
  const [hours, setHours] = useState<number>(10);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<any>();
  const [isAgree, setAgree] = useState<boolean>(false);
  const [isSubscribe, setSubscribe] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IForm>({});

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    console.log('control', control);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [window.innerWidth]);

  if (typeof window === 'undefined') null;
  return (
    <section className={styles.section}>
      <div className={clsx(styles.container, { [styles.container__error]: Object.keys(errors).length > 0 })}>
        {Object.keys(errors).length > 0 && (
          <Snackbar isAgree={isAgree} paymentMethod={paymentMethod} control={control} errors={errors} />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.form, { [styles.form__error]: Object.keys(errors).length > 0 })}>
          {window.innerWidth > 768 || windowWidth > 768 ? (
            <>
              <Payment
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
                  <OrderSummary setDiscountCode={setDiscountCode} discountCode={discountCode} />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* <div className={styles.summary}>
                <div className={styles.summary__content}>
                  <h3 className={styles.summary__title}>Pricing Plan</h3>
                  <div className={styles.divider}></div>
                  <PricingPlan pricingPlan={pricingPlan} setPricingPlan={setPricingPlan} hours={hours} setHours={setHours} />
                  <Payment control={control} register={register} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                  <h3 className={styles.summary__title}>Order summary</h3>
                  <div className={styles.divider}></div>
                  <OrderSummary setDiscountCode={setDiscountCode} discountCode={discountCode} />
                </div>
              </div> */}
            </>
          )}
        </form>
      </div>
    </section>
  );
};
export default HomePage;
