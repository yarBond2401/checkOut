import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/main.module.scss';
import CustomInput from './CustomInput';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import CardInput from './CardDataInput';
import { countries } from '@/constants/countries';
import { EMAIL_REG_EXP } from '@/constants/emailRegularExp';
import {
  setAgree,
  setCardNumber,
  setCvv,
  setExpiration,
  setPaymentMethod,
  setSubscribe,
  setConfirmEmail,
  setCountry,
  setEmail,
  setFirstName,
  setLastName,
  setPhoneNumber,
} from '@/store/reducers/mainReducer';
import useAppSelector from '@/hooks/use-app-selector';
import useAppDispatch from '@/hooks/use-app-dispatch';

const Payment: React.FC = () => {
  const {
    isAgree,
    isSubscribe,
    paymentMethod,
    formData: { firstName, lastName, email, confirmEmail, cardNumber, cvv, expiration, country, phoneNumber },
  } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();
  /* ============================================================================================================================= */
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCardNumber = e.target.value
      .replace(/\D/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .slice(0, 19)
      .trim();

    dispatch(setCardNumber(formattedCardNumber));
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '').slice(0, 4);
    dispatch(setCvv(inputValue));
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue[0] === '0' || inputValue[0] === '1') {
      const formattedValue = inputValue.substring(0, 2) + (inputValue.length > 2 ? ' / ' : '') + inputValue.replace(/\//g, '').substring(2, 4);
      dispatch(setExpiration(formattedValue));
    } else {
      const formattedValue =
        (inputValue.length === 1 ? '0' : '') + inputValue.substring(0, 1) + (inputValue.length > 2 ? '/' : '') + inputValue.replace(/\//g, '').substring(2, 4);
      dispatch(setExpiration(formattedValue));
    }
  };

  return (
    <div className={styles.payment}>
      <h2 className={styles.title}>Payment</h2>
      <div className={styles.divider}></div>
      <h3 className={styles.subtitle}>Contact Information</h3>
      <div className={styles.payment__inputs}>
        <div className={styles.payment__inputsRow}>
          <CustomInput
            onChangeCallback={setFirstName}
            value={firstName}
            isRequired={true}
            label="First Name"
            id="firstName"
            placeholder="First Name"
          />
          <CustomInput
            onChangeCallback={setLastName}
            value={lastName}
            isRequired={true}
            label="Last Name"
            id="lastName"
            placeholder="Last Name"
          />
        </div>
        <CustomInput
          onChangeCallback={setEmail}
          value={email}
          isRequired={true}
          label="Contact Email"
          id="email"
          placeholder="Contact Email"
        />
        {firstName && lastName && EMAIL_REG_EXP.test(email) && (
          <>
            <CustomInput
              onChangeCallback={setConfirmEmail}
              value={confirmEmail}
              isRequired={true}
              label="Confirm Email"
              id="confirmEmail"
              placeholder="Confirm Email"
            />
            {confirmEmail && email && confirmEmail !== email && <div className={styles.mismatch}>Email Adress Is Not Matched</div>}
            <div className={styles.payment__inputsRow}>
              <div className={styles.input}>
                <label className={styles.input__label} htmlFor="country">
                  Country/Region
                </label>
                <select
                  onChange={(e) => dispatch(setCountry(e.target.value))}
                  className={styles.input__item}
                  value={country}
                  name="countries"
                  id="country"
                >
                  {countries.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>

              <CustomInput
                onChangeCallback={setPhoneNumber}
                value={phoneNumber}
                type="number"
                isRequired={true}
                label="Phone Number"
                id="phoneNumber"
                placeholder="Your Phone Number"
              />
            </div>
          </>
        )}
        {!EMAIL_REG_EXP.test(email) && email && <div className={styles.error}>Invalid Email Address</div>}
      </div>
      <h3 className={styles.subtitle}>Choose payment method</h3>
      <div className={styles.payment__variants}>
        <div className={styles.payment__variant}>
          <div onClick={() => dispatch(setPaymentMethod(PaymentMethodEnum.CREDIT_CARD))} className={styles.row}>
            <div className={styles.row__left}>
              <button type="button" onClick={() => dispatch(setPaymentMethod(PaymentMethodEnum.CREDIT_CARD))} className={styles.radio}>
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
              <div title="Master Card" className={styles.row__card}>
                <Image width={35} height={25} src="/assets/payment/MasterCard.svg" alt="Master Card" />
              </div>
              <div title="Visa" className={styles.row__card}>
                <Image width={35} height={25} src="/assets/payment/Visa.svg" alt="Visa" />
              </div>
              <div title="American Express" className={styles.row__card}>
                <Image width={35} height={25} src="/assets/payment/amex.svg" alt="American Express" />
              </div>
              <div title="Discover" className={styles.row__card}>
                <Image width={35} height={25} src="/assets/payment/discover.svg" alt="Discover" />
              </div>
            </div>
          </div>
          {paymentMethod === PaymentMethodEnum.CREDIT_CARD && (
            <>
              <div className={styles.payText}>Pay with your Credit Card via Stripe</div>
              <div className={clsx(styles.payment__inputs, styles.payment__inputs_bottom)}>
                <CardInput
                  value={cardNumber}
                  isRequired={false}
                  label="Card Number"
                  id="cardNumber"
                  placeholder="1234 5678 9101 1121"
                  hangleChange={handleCardNumberChange}
                />
                <div style={{ marginBottom: 16 }}></div>
                <div className={styles.payment__inputsRow}>
                  <CardInput
                    value={expiration}
                    isRequired={false}
                    label="Expiration Date"
                    id="expiration"
                    placeholder="MM/YY"
                    hangleChange={handleExpirationChange}
                  />
                  <CardInput value={cvv} isRequired={false} label="CVV" id="cvv" placeholder="123" hangleChange={handleCVVChange} />
                </div>
              </div>
            </>
          )}
        </div>
        <div onClick={() => dispatch(setPaymentMethod(PaymentMethodEnum.PAYPAL))} className={styles.payment__variant}>
          <div className={styles.paypalRow}>
            <button type="button" onClick={() => dispatch(setPaymentMethod(PaymentMethodEnum.PAYPAL))} className={styles.radio}>
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
            <input id="agreement" style={{ width: 20, height: 20 }} checked={isAgree} onChange={(e) => dispatch(setAgree())} type="checkbox" />
          </div>
          <label htmlFor="agreement" className={styles.agreement__text}>
            I Agree With{' '}
            <Link target="_blank" href={'https://eleganttechbd.com/terms-and-conditions/'} className={styles.agreement__highlighted}>
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link target="_blank" href={'https://eleganttechbd.com/privacy-policy/'} className={styles.agreement__highlighted}>
              Privacy Policy.
            </Link>
          </label>
        </div>
        <div className={styles.agreement__item}>
          <div className={styles.agreement__checkbox}>
            <input id="subscribe" style={{ width: 20, height: 20 }} checked={isSubscribe} onChange={(e) => dispatch(setSubscribe())} type="checkbox" />
          </div>
          <label htmlFor="subscribe" className={styles.agreement__text}>
            Get free tips and discount code for us.
          </label>
        </div>
      </div>
    </div>
  );
};
export default Payment;
