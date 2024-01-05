'use client';
import React, { useState, useEffect } from 'react';
import styles from '../styles/main.module.scss';
import PricingPlan from '@/components/PricingPlan';
import OrderSummary from '@/components/OrderSummary';
import Payment from '@/components/Payment';
import Snackbar from '@/components/Snackbar';
import clsx from 'clsx';
import Popup from '@/components/Popup';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { initialOptions } from '@/constants/initialPaymentOptions';
import { IForm } from '@/models/IForm';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import { useGetWindowWidth } from '@/hooks/use-get-window-width';
import useAppSelector from '@/hooks/use-app-selector';
import { setPopup } from '@/store/reducers/mainReducer';
import useAppDispatch from '@/hooks/use-app-dispatch';
import { useAppSnakbar } from '@/hooks/use-app-snackbar';
import { redirect, useRouter } from 'next/navigation';

const MainSection: React.FC = ({}) => {
  const { windowWidth } = useGetWindowWidth();
  const { isPopup, isAgree, snackbarText } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<IForm>({ shouldFocusError: false });
  const {snackbarShow} = useAppSnakbar(errors)

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      snackbarShow();
    }
  }, [errors]);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (!isAgree) return;
    if (data.confirmEmail !== data.email && !isAgree) return snackbarShow();

    dispatch(setPopup(true));
    router.push('/order-recieved')
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <section id="section" className={styles.section}>
        {isPopup && <Popup />}
        <div className={clsx(styles.container, { [styles.container__error]: snackbarText.length > 0 })}>
          {snackbarText.length > 0 && <Snackbar control={control} />}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {windowWidth > 768 && (
              <>
                <Payment setValue={setValue} control={control} register={register} />
                <div className={styles.summary}>
                  <div className={styles.summary__content}>
                    <h3 className={styles.summary__title}>Order Summary</h3>
                    <div className={styles.divider}></div>
                    <PricingPlan />
                    <OrderSummary snackbarShow={() => snackbarShow()} />
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
                    <OrderSummary snackbarShow={() => snackbarShow()} />
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </PayPalScriptProvider>
  );
};
export default MainSection;
