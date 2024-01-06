'use client';
import React, {  useEffect } from 'react';
import styles from '../styles/main.module.scss';
import PricingPlan from '@/components/PricingPlan';
import OrderSummary from '@/components/OrderSummary';
import Payment from '@/components/Payment';
import Snackbar from '@/components/Snackbar';
import clsx from 'clsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { initialOptions } from '@/constants/initialPaymentOptions';
import { useGetWindowWidth } from '@/hooks/use-get-window-width';
import useAppSelector from '@/hooks/use-app-selector';
import useAppDispatch from '@/hooks/use-app-dispatch';
import { IStandartPaymentData } from '@/models/paymentInfo/IStandartPaymentData';
import { setInitialStandartPaymentData } from '@/store/reducers/pricingReducer';

interface MainSectionProps {
  standartPaymentData: IStandartPaymentData;
}

const MainSection: React.FC<MainSectionProps> = ({ standartPaymentData }) => {
  const { windowWidth } = useGetWindowWidth();
  const { snackbarText } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInitialStandartPaymentData(standartPaymentData));
  }, []);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <section id="section" className={styles.section}>
        <div className={clsx(styles.container, { [styles.container__error]: snackbarText.length > 0 })}>
          {snackbarText.length > 0 && <Snackbar />}
          <div className={styles.form}>
            {windowWidth > 768 && (
              <>
                <Payment />
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
                    <Payment />
                    <h3 className={styles.summary__title}>Order summary</h3>
                    <div className={styles.divider}></div>
                    <OrderSummary />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </PayPalScriptProvider>
  );
};
export default MainSection;
