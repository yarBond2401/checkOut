import React, { useState, useEffect } from 'react';
import styles from '../styles/payment.module.scss';
import CustomInput from './CustomInput';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import Image from 'next/image';
import clsx from 'clsx';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IForm } from '@/models/IForm';

interface PaymentProps {
  register: UseFormRegister<IForm>;
  errors: FieldErrors<IForm>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodEnum>>;
  paymentMethod: PaymentMethodEnum;
}

const Payment: React.FC<PaymentProps> = ({ register, errors, setPaymentMethod, paymentMethod }) => {
  return (
    <div className={styles.payment}>
      <h2 className={styles.title}>Payment</h2>
      <div className={styles.divider}></div>
      <h3 className={styles.subtitle}>Contact Information</h3>
      <div className={styles.payment__inputs}>
        <div className={styles.payment__inputsRow}>
          <CustomInput register={register} errors={errors} isRequired={true} label="First Name" id="firstName" placeholder="First Name" />
          <CustomInput register={register} errors={errors} isRequired={true} label="Last Name" id="lastName" placeholder="Last Name" />
        </div>
        <CustomInput register={register} errors={errors} isRequired={true} label="Contact Email" id="email" placeholder="Contact Email" />
        {/* <CustomInput register={register} errors={errors} isRequired={true} label="Confirm Email" id="confirmEmail" placeholder="Confirm Email" />
        <div className={styles.payment__inputsRow}>
          <CustomInput register={register} errors={errors} isRequired={true} label="Country/Region" id="country" placeholder="Choose Country" />
          <CustomInput register={register} errors={errors} isRequired={true} label="Phone Number" id="phoneNumber" placeholder="Your Phone Number" />
        </div> */}
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
                <Image width={35} height={25} src="/assets/payment/JCB.svg" alt="JCB" />
              </div>
              <div className={styles.row__card}>
                <Image width={35} height={25} src="/assets/payment/GooglePay.svg" alt="Google Pay" />
              </div>
            </div>
          </div>
          <div className={styles.payText}>Pay with your Credit Card via Stripe</div>
          <div className={clsx(styles.payment__inputs, styles.payment__inputs_bottom)}>
            <CustomInput register={register} errors={errors} isRequired={false} label="Card Number" id="cardNumber" placeholder="1234 5678 9101 1121" />
            <div style={{ marginBottom: 16 }}></div>
            <div className={styles.payment__inputsRow}>
              <CustomInput register={register} errors={errors} isRequired={false} label="Expiration Date" id="expiration" placeholder="MM/YY" />
              <CustomInput register={register} errors={errors} isRequired={false} label="CVV" id="cvv" placeholder="123" />
            </div>
          </div>
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
            <Image width={66} height={17} src="/assets/payment/Paypal.svg" alt="PayPal" />
          </div>
        </div>
      </div>
      <div className={styles.agreement}>
        <div className={styles.agreement__item}>
          <div className={styles.agreement__checkbox}>
            <input type="checkbox" />
          </div>
          <div className={styles.agreement__text}>
            I Agree With <span className={styles.agreement__highlighted}>Terms & Conditions</span> and{' '}
            <span className={styles.agreement__highlighted}>Privacy Policy.</span>
          </div>
        </div>
        <div className={styles.agreement__item}>
          <div className={styles.agreement__checkbox}>
            <input type="checkbox" />
          </div>
          <div className={styles.agreement__text}>Get free tips and discount code for us.</div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
