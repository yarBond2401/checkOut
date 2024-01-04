'use client';
import React, { useState, useEffect } from 'react';
import styles from '../styles/main.module.scss';
import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import PricingPlan from '@/components/PricingPlan';
import OrderSummary from '@/components/OrderSummary';
import Payment from '@/components/Payment';
import Snackbar from '@/components/Snackbar';
import clsx from 'clsx';
import Popup from '@/components/Popup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { initialOptions } from '@/constants/initialPaymentOptions';
import { IForm } from '@/models/IForm';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import { useGetWindowWidth } from '@/hooks/use-get-window-width';
import StoreProvider from '@/app/StoreProvider';
import useAppSelector from '@/hooks/use-app-selector';
import { setPopup, setShowSnackbar } from '@/store/reducers/mainReducer';

const MainSection: React.FC = ({}) => {
  const { windowWidth } = useGetWindowWidth();
  const { isShowSnackbar, isPopup, isAgree, submitClick, paymentMethod } = useAppSelector((state) => state.mainReducer);

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
    <StoreProvider>
      <PayPalScriptProvider options={initialOptions}>
        <section id="section" className={styles.section}>
          {isPopup && <Popup />}
          <div className={clsx(styles.container, { [styles.container__error]: Object.keys(errors).length > 0 || isShowSnackbar })}>
            {(isShowSnackbar || Object.keys(errors).length > 0) && (
              <Snackbar submitClick={submitClick} isAgree={isAgree} paymentMethod={paymentMethod} control={control} errors={errors} />
            )}
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {windowWidth > 768 && (
                <>
                  <Payment setValue={setValue} control={control} register={register} />
                  <div className={styles.summary}>
                    <div className={styles.summary__content}>
                      <h3 className={styles.summary__title}>Order Summary</h3>
                      <div className={styles.divider}></div>
                      <PricingPlan />
                      <OrderSummary />
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
                      <PricingPlan />
                      <Payment setValue={setValue} control={control} register={register} />
                      <h3 className={styles.summary__title}>Order summary</h3>
                      <div className={styles.divider}></div>
                      <OrderSummary />
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </section>
      </PayPalScriptProvider>
    </StoreProvider>
  );
};
export default MainSection;
