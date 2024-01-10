'use client';
import React, { useEffect } from 'react';
import styles from '../styles/main.module.scss';
import PricingPlan from '@/modules/Checkout/components/PricingPlan';
import OrderSummary from '@/modules/Checkout/components/OrderSummary';
import Payment from '@/modules/Checkout/components/Payment';
import Snackbar from '@/modules/Checkout/components/Snackbar';
import clsx from 'clsx';
import { PayPalHostedField, PayPalHostedFieldsProvider, PayPalScriptProvider, usePayPalHostedFields } from '@paypal/react-paypal-js';
import { initialOptions } from '@/modules/Checkout/constants/initialPaymentOptions';
import { useGetWindowWidth } from '@/modules/Checkout/hooks/use-get-window-width';
import useAppSelector from '@/modules/Checkout/hooks/use-app-selector';
import useAppDispatch from '@/modules/Checkout/hooks/use-app-dispatch';
import { IStandartPaymentData } from '@/models/paymentInfo/IStandartPaymentData';
import { handleSetOrderVariant, setInitialStandartPaymentData } from '@/modules/Checkout/store/reducers/pricingReducer';
import Popup from './Popup';
import { setCountry } from '@/modules/Checkout/store/reducers/mainReducer';
import { PricingPlanEnum } from '@/models/PricingPlanEnum';

interface MainSectionProps {
  standartPaymentData: IStandartPaymentData;
  countryName: string;
  pricingPlan: PricingPlanEnum;
  dataClientToken: string;
}

const MainSection: React.FC<MainSectionProps> = ({ standartPaymentData, countryName, pricingPlan, dataClientToken }) => {
  const { windowWidth } = useGetWindowWidth();
  const { snackbarText, successOrderId } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInitialStandartPaymentData(standartPaymentData));
    dispatch(setCountry(countryName));
    dispatch(handleSetOrderVariant(pricingPlan));
  }, []);

  return (
    <PayPalScriptProvider
      options={{
        clientId: 'AeSoKlVSOK2BYAKRPO0MxY_sw18rAUEHbCWDfhvU9UY2K97HHWOQZnjFLtRmVY8VqVge4-EoFUBM7LdM',
        dataClientToken,
        components: 'hosted-fields,buttons',
      }}
    >

        <section id="section" className={styles.section}>
          {successOrderId && <Popup transactionID={successOrderId} />}
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
