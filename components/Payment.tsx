import React, { useState, useEffect } from 'react';
import styles from '../styles/main.module.scss';
import CustomInput from './CustomInput';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import Image from 'next/image';
import clsx from 'clsx';
import { Control, FormState, UseFormRegister, useWatch } from 'react-hook-form';
import { IForm } from '@/models/IForm';

const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

interface PaymentProps {
  register: UseFormRegister<IForm>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodEnum>>;
  paymentMethod: PaymentMethodEnum;
  control: Control<IForm, any>;
  isAgree: boolean;
  isSubscribe: boolean;
  setSubscribe: React.Dispatch<React.SetStateAction<boolean>>;
  setAgree: React.Dispatch<React.SetStateAction<boolean>>;
}

const Payment: React.FC<PaymentProps> = ({ register, setPaymentMethod, paymentMethod, control, isAgree, isSubscribe, setAgree, setSubscribe }) => {
  const watchedEmailInput = useWatch({ control, name: 'email' });
  const watchedNameInput = useWatch({ control, name: 'firstName' });
  const watchedLastNameInput = useWatch({ control, name: 'lastName' });

  return (
    <div className={styles.payment}>
      <h2 className={styles.title}>Payment</h2>
      <div className={styles.divider}></div>
      <h3 className={styles.subtitle}>Contact Information</h3>
      <div className={styles.payment__inputs}>
        <div className={styles.payment__inputsRow}>
          <CustomInput register={register} isRequired={true} label="First Name" id="firstName" placeholder="First Name" />
          <CustomInput register={register} isRequired={true} label="Last Name" id="lastName" placeholder="Last Name" />
        </div>
        <CustomInput regularExpression={EMAIL_REG_EXP} register={register} isRequired={true} label="Contact Email" id="email" placeholder="Contact Email" />
        {watchedNameInput && watchedLastNameInput && EMAIL_REG_EXP.test(watchedEmailInput) && (
          <>
            <CustomInput register={register} isRequired={true} label="Confirm Email" id="confirmEmail" placeholder="Confirm Email" />
            <div className={styles.payment__inputsRow}>
              <CustomInput register={register} isRequired={true} label="Country/Region" id="country" placeholder="Choose Country" />
              <CustomInput register={register} isRequired={true} label="Phone Number" id="phoneNumber" placeholder="Your Phone Number" />
            </div>
          </>
        )}
        {!EMAIL_REG_EXP.test(watchedEmailInput) && watchedEmailInput && <div className={styles.error}>Invalid Email Address</div>}
      </div>
      <h3 className={styles.subtitle}>Choose payment method</h3>
      <div className={styles.payment__variants}>
        <div className={styles.payment__variant}>
          <div onClick={() => setPaymentMethod(PaymentMethodEnum.CREDIT_CARD)} className={styles.row}>
            <div className={styles.row__left}>
              <button type="button" onClick={() => setPaymentMethod(PaymentMethodEnum.CREDIT_CARD)} className={styles.radio}>
                {paymentMethod === PaymentMethodEnum.CREDIT_CARD ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <circle cx="7.99992" cy="8.49992" r="3.78947" fill="#0B62E5" />
                    <circle cx="7.99999" cy="8.50012" r="7.1579" stroke="#0B62E5" strokeWidth="1.68421" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <circle cx="8.49999" cy="8.00012" r="7.1579" stroke="#D1D1D1" strokeWidth="1.68421" />
                  </svg>
                )}
              </button>
              <div className={styles.row__title}>Credit Cards</div>
            </div>
            <div className={styles.row__right}>
              <div className={styles.row__card}>
                <Image width={35} height={25} src="/assets/payment/MasterCard.svg" alt="Master Card" />
              </div>
              <div className={styles.row__card}>
                <Image width={35} height={25} src="/assets/payment/Visa.svg" alt="Visa" />
              </div>
              <div className={styles.row__card}>
                <Image width={35} height={25} src="/assets/payment/amex.svg" alt="American Express" />
              </div>
              <div className={styles.row__card}>
                <Image width={35} height={25} src="/assets/payment/discover.svg" alt="Google Pay" />
              </div>
            </div>
          </div>
          {paymentMethod === PaymentMethodEnum.CREDIT_CARD && (
            <>
              <div className={styles.payText}>Pay with your Credit Card via Stripe</div>
              <div className={clsx(styles.payment__inputs, styles.payment__inputs_bottom)}>
                <CustomInput register={register} isRequired={false} label="Card Number" id="cardNumber" placeholder="1234 5678 9101 1121" />
                <div style={{ marginBottom: 16 }}></div>
                <div className={styles.payment__inputsRow}>
                  <CustomInput register={register} isRequired={false} label="Expiration Date" id="expiration" placeholder="MM/YY" />
                  <CustomInput register={register} isRequired={false} label="CVV" id="cvv" placeholder="123" />
                </div>
              </div>
            </>
          )}
        </div>
        <div onClick={() => setPaymentMethod(PaymentMethodEnum.PAYPAL)} className={styles.payment__variant}>
          <div className={styles.paypalRow}>
            <button type="button" onClick={() => setPaymentMethod(PaymentMethodEnum.PAYPAL)} className={styles.radio}>
              {paymentMethod === PaymentMethodEnum.PAYPAL ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <circle cx="7.99992" cy="8.49992" r="3.78947" fill="#0B62E5" />
                  <circle cx="7.99999" cy="8.50012" r="7.1579" stroke="#0B62E5" strokeWidth="1.68421" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <circle cx="8.49999" cy="8.00012" r="7.1579" stroke="#D1D1D1" strokeWidth="1.68421" />
                </svg>
              )}
            </button>
            <Image width={66} height={17} src="/assets/payment/PayPal.svg" alt="PayPal" />
          </div>
        </div>
      </div>
      <div className={styles.agreement}>
        <div className={styles.agreement__item}>
          <div className={styles.agreement__checkbox}>
            <input checked={isAgree} onChange={(e) => setAgree(!isAgree)} type="checkbox" />
          </div>
          <div className={styles.agreement__text}>
            I Agree With <span className={styles.agreement__highlighted}>Terms & Conditions</span> and{' '}
            <span className={styles.agreement__highlighted}>Privacy Policy.</span>
          </div>
        </div>
        <div className={styles.agreement__item}>
          <div className={styles.agreement__checkbox}>
            <input checked={isSubscribe} onChange={(e) => setSubscribe(!isSubscribe)} type="checkbox" />
          </div>
          <div className={styles.agreement__text}>Get free tips and discount code for us.</div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
