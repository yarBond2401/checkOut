import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/main.module.scss';
import CustomInput from './CustomInput';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import Image from 'next/image';
import clsx from 'clsx';
import { Control, Controller, FormState, UseFormRegister, UseFormSetError, UseFormSetValue, useForm, useWatch } from 'react-hook-form';
import { IForm } from '@/models/IForm';
import Link from 'next/link';
import CardInput from './CardDataInput';

import { number } from 'card-validator';
import { CardNumberVerification } from 'card-validator/dist/card-number';
import { cvv } from 'card-validator';
import { Verification } from 'card-validator/dist/types';
import { expirationDate, expirationMonth, expirationYear } from 'card-validator';
import { ExpirationDateVerification } from 'card-validator/dist/expiration-date';
import { ExpirationMonthVerification } from 'card-validator/dist/expiration-month';
import { ExpirationYearVerification } from 'card-validator/dist/expiration-year';
import { countries } from '@/constants/countries';
import { EMAIL_REG_EXP } from '@/constants/emailRegularExp';

interface PaymentProps {
  register: UseFormRegister<IForm>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodEnum>>;
  paymentMethod: PaymentMethodEnum;
  control: Control<IForm, any>;
  isAgree: boolean;
  isSubscribe: boolean;
  setSubscribe: React.Dispatch<React.SetStateAction<boolean>>;
  setAgree: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: UseFormSetValue<IForm>;
}

const Payment: React.FC<PaymentProps> = ({ register, setPaymentMethod, paymentMethod, control, isAgree, isSubscribe, setAgree, setSubscribe, setValue }) => {
  const watchedEmailInput = useWatch({ control, name: 'email' });
  const watchedNameInput = useWatch({ control, name: 'firstName' });
  const watchedLastNameInput = useWatch({ control, name: 'lastName' });
  const watchedConfirmEmailInput = useWatch({ control, name: 'confirmEmail' });
  /* ============================================================================================================================= */
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCardNumber = e.target.value
      .replace(/\D/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .slice(0, 19)
      .trim();

    setValue('cardNumber', formattedCardNumber);
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('cvv', e.target.value.replace(/\D/g, '').slice(0, 4));
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Удаление всех символов, кроме цифр
    if (inputValue[0] === '0' || inputValue[0] === '1') {
      const formattedValue = inputValue.substring(0, 2) + (inputValue.length > 2 ? ' / ' : '') + inputValue.replace(/\//g, '').substring(2, 4);
      setValue('expiration', formattedValue);
    } else {
      const formattedValue =
        (inputValue.length === 1 ? '0' : '') + inputValue.substring(0, 1) + (inputValue.length > 2 ? '/' : '') + inputValue.replace(/\//g, '').substring(2, 4);
      setValue('expiration', formattedValue);
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
            errorMessage="Billing First Name Is A Required Field."
            register={register}
            isRequired={true}
            label="First Name"
            id="firstName"
            placeholder="First Name"
          />
          <CustomInput
            errorMessage="Billing Last Name Is A Required Field."
            register={register}
            isRequired={true}
            label="Last Name"
            id="lastName"
            placeholder="Last Name"
          />
        </div>
        <CustomInput
          errorMessage="Billing Email Address Is A Required Field"
          regularExpression={EMAIL_REG_EXP}
          register={register}
          isRequired={true}
          label="Contact Email"
          id="email"
          placeholder="Contact Email"
        />
        {watchedNameInput && watchedLastNameInput && EMAIL_REG_EXP.test(watchedEmailInput) && (
          <>
            <CustomInput
              errorMessage="Billing Confirm Email Is A Required Field."
              register={register}
              isRequired={true}
              label="Confirm Email"
              id="confirmEmail"
              placeholder="Confirm Email"
            />
            {watchedConfirmEmailInput && watchedEmailInput && watchedConfirmEmailInput !== watchedEmailInput && (
              <div className={styles.mismatch}>Email Adress Is Not Matched</div>
            )}
            <div className={styles.payment__inputsRow}>
              <div className={styles.input}>
                <label className={styles.input__label} htmlFor="country">
                  Country/Region
                </label>
                <select
                  defaultValue={'United States (US)'}
                  {...register('country', { required: 'Please, select a country' })}
                  className={styles.input__item}
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
                type="number"
                errorMessage="Billing Phone Is A Required Field."
                register={register}
                isRequired={true}
                label="Phone Number"
                id="phoneNumber"
                placeholder="Your Phone Number"
              />
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
                <Controller
                  rules={{
                    required: 'Card Number is required',
                    validate: (value) => {
                      const newValue = value.replace(/\s/g, '');
                      const cardNumberValidator: CardNumberVerification = number(newValue);
                      if ((newValue && !cardNumberValidator.isPotentiallyValid) || !cardNumberValidator.isValid) {
                        return 'Invalid Card Number';
                      }
                      return true;
                    },
                  }}
                  name="cardNumber"
                  control={control}
                  defaultValue={''}
                  render={({ field }) => (
                    <CardInput
                      isRequired={false}
                      label="Card Number"
                      id="cardNumber"
                      placeholder="1234 5678 9101 1121"
                      field={field}
                      hangleChange={handleCardNumberChange}
                    />
                  )}
                />
                <div style={{ marginBottom: 16 }}></div>
                <div className={styles.payment__inputsRow}>
                  <Controller
                    rules={{
                      required: 'Expiration is required',
                      validate: (value) => {
                        const newValue = value.replace(/\s/g, '');
                        const epirationDate: ExpirationDateVerification = expirationDate(newValue);
                        // const epirationMonth: ExpirationMonthVerification = expirationMonth(newValue);
                        // const epirationYear: ExpirationYearVerification = expirationYear(newValue);
                        if ((newValue && !epirationDate.isPotentiallyValid) || !epirationDate.isValid) {
                          return 'Invalid Expiration';
                        }
                        return true;
                      },
                    }}
                    name="expiration"
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                      <CardInput
                        isRequired={false}
                        label="Expiration Date"
                        id="expiration"
                        placeholder="MM/YY"
                        field={field}
                        hangleChange={handleExpirationChange}
                      />
                    )}
                  />
                  <Controller
                    rules={{
                      required: 'CVV is required',
                      validate: (value) => {
                        const CVCverify: Verification = cvv(value);
                        if ((value && !CVCverify.isPotentiallyValid) || !CVCverify.isValid) {
                          return 'Invalid CVV';
                        }
                        return true;
                      },
                    }}
                    name="cvv"
                    control={control}
                    defaultValue={''}
                    render={({ field }) => <CardInput isRequired={false} label="CVV" id="cvv" placeholder="123" field={field} hangleChange={handleCVVChange} />}
                  />
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
            <input id="agreement" style={{ width: 20, height: 20 }} checked={isAgree} onChange={(e) => setAgree(!isAgree)} type="checkbox" />
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
            <input id="subscribe" style={{ width: 20, height: 20 }} checked={isSubscribe} onChange={(e) => setSubscribe(!isSubscribe)} type="checkbox" />
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
