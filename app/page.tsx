'use client';

import clsx from 'clsx';
import styles from './payment.module.scss';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import Link from 'next/link';
import { useForm, SubmitHandler, UseFormRegister, FieldErrors } from 'react-hook-form';

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  // confirmEmail: string;
  // countryRegion: string;
  // phoneNumber: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
}

interface CustomInputProps {
  label: string;
  id: 'firstName' | 'lastName' | 'email' | 'cardNumber' | 'expiration' | 'cvv';
  placeholder: string;
  isRequired: boolean;
  register: UseFormRegister<IForm>;
  errors: FieldErrors<IForm>;
}
const CustomInput: React.FC<CustomInputProps> = ({ label, id, placeholder, isRequired, register, errors }) => {
  const fieldIsRequired = 'Field Is Required *';

  return (
    <div className={styles.input}>
      <label className={clsx(styles.input__label, { [styles.input__label_noReq]: !isRequired })} htmlFor={id}>
        {label}
      </label>
      <input
        {...register(id, {
          required: fieldIsRequired,
          // pattern: {
          //   value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
          //   message: 'Please, enter valid email',
          // },
        })}
        // helperText={errors.email?.message}
        className={styles.input__item}
        id={id}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

enum PaymentMethod {
  CREDIT_CARD = 'credit',
  PAYPAL = 'paypal',
}
enum OrderMethodEnum {
  PAY_AS_GO = 'payAsGo',
  MONTHLY = 'monthly',
}

const HomePage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
  const [orderMethod, setOrderMethod] = useState<OrderMethodEnum>(OrderMethodEnum.PAY_AS_GO);
  const [hours, setHours] = useState<number>(60);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({});

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    console.log('formData', data);
  };

  const decreaseNum = () => {
    if (hours === 0) return;
    setHours((actual) => actual - 1);
  };
  const increaseNum = () => {
    if (hours === 160) return;
    setHours((actual) => actual + 1);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (isNaN(value)) return;
    if (value > 160) return;
    setHours(value);
  };

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.payment}>
          <h2 className={styles.title}>Payment</h2>
          <div className={styles.divider}></div>
          <h3 className={styles.subtitle}>Contact Information</h3>
          <div className={styles.payment__inputs}>
            <div className={styles.payment__inputsRow}>
              <CustomInput register={register} errors={errors} isRequired={true} label="Last Name" id="firstName" placeholder="First Name *" />
              <CustomInput register={register} errors={errors} isRequired={true} label="Last Name" id="lastName" placeholder="Last Name *" />
            </div>
            <CustomInput register={register} errors={errors} isRequired={true} label="Contact Email" id="email" placeholder="Contact Email *" />
          </div>
          <h3 className={styles.subtitle}>Choose payment method</h3>
          <div className={styles.payment__variants}>
            <div className={styles.payment__variant}>
              <div onClick={() => setPaymentMethod(PaymentMethod.CREDIT_CARD)} className={styles.row}>
                <div className={styles.row__left}>
                  <button type="button" onClick={() => setPaymentMethod(PaymentMethod.CREDIT_CARD)} className={styles.radio}>
                    {paymentMethod === PaymentMethod.CREDIT_CARD ? (
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
            <div onClick={() => setPaymentMethod(PaymentMethod.PAYPAL)} className={styles.payment__variant}>
              <div className={styles.paypalRow}>
                <button type="button" onClick={() => setPaymentMethod(PaymentMethod.PAYPAL)} className={styles.radio}>
                  {paymentMethod === PaymentMethod.PAYPAL ? (
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
        <div className={styles.summary}>
          <div className={styles.summary__content}>
            <h3 className={styles.summary__title}>Order summary</h3>
            <div className={styles.divider}></div>
            <div className={styles.order__variants}>
              <button
                type="button"
                onClick={() => setOrderMethod(OrderMethodEnum.PAY_AS_GO)}
                className={clsx(styles.order__variant, { [styles.order__variant_active]: orderMethod === OrderMethodEnum.PAY_AS_GO })}
              >
                <div className={styles.order__head}>
                  <div className={styles.order__radio}>
                    {orderMethod === OrderMethodEnum.PAY_AS_GO ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="7.99998" cy="7.99992" r="3.78947" fill="white" />
                        <circle cx="7.99999" cy="8.00012" r="7.1579" stroke="white" strokeWidth="1.68421" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <circle cx="8.49999" cy="8.00012" r="7.1579" stroke="#D1D1D1" strokeWidth="1.68421" />
                      </svg>
                    )}
                  </div>
                  <div className={styles.order__title}>Pay As You Go</div>
                </div>
                <div className={styles.order__text}>No obligations, no contracts, only pay for the time you actually need.</div>
              </button>
              <button
                type="button"
                onClick={() => setOrderMethod(OrderMethodEnum.MONTHLY)}
                className={clsx(styles.order__variant, { [styles.order__variant_active]: orderMethod === OrderMethodEnum.MONTHLY })}
              >
                <div className={styles.order__head}>
                  <div className={styles.order__radio}>
                    {orderMethod === OrderMethodEnum.MONTHLY ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="7.99998" cy="7.99992" r="3.78947" fill="white" />
                        <circle cx="7.99999" cy="8.00012" r="7.1579" stroke="white" strokeWidth="1.68421" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <circle cx="8.49999" cy="8.00012" r="7.1579" stroke="#D1D1D1" strokeWidth="1.68421" />
                      </svg>
                    )}
                  </div>
                  <div className={styles.order__title}>Monthly</div>
                </div>
                <div className={styles.order__text}>Add a dedicated Designer to your team with unlimited revisions.</div>
              </button>
            </div>
            <div className={styles.hours}>
              <div className={styles.hours__container}>
                <h3 className={styles.hours__title}>{orderMethod === OrderMethodEnum.PAY_AS_GO ? 'Pay as you go' : 'Monthly'}</h3>
                <div className={styles.hours__buttons}>
                  <button type="button" onClick={decreaseNum} className={styles.hours__minusButton}>
                    <AiOutlineMinus />
                  </button>
                  <input type="text" value={hours} onChange={(e) => handleHoursChange(e)} className={styles.hours__input} />
                  <button onClick={increaseNum} type="button" className={styles.hours__plusButton}>
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
              <div className={styles.hours__reference}>
                {orderMethod === OrderMethodEnum.PAY_AS_GO ? '*Enter Manually hours between 10 to 160' : '*You can also enter month manually between 1 to 12'}
              </div>
            </div>
            <div className={styles.order_divider}></div>
            <div className={styles.discount}>
              <input type="text" className={styles.discount__input} placeholder="Gift or discount code" />
              <button type="button" className={styles.discount__button}>
                Apply
              </button>
            </div>
            <div className={styles.order_divider}></div>
            <div className={styles.total}>
              <div className={styles.total__row}>
                <div className={styles.total__text}>Subtotal (03 hours x $2398.4)</div>
                <div className={styles.total__text}>$299.9</div>
              </div>
              <div className={styles.total__row}>
                <div className={styles.total__text}>Platform fee (2%)</div>
                <div className={styles.total__text}>$5.99</div>
              </div>
              <div className={styles.order_divider}></div>
              <div className={styles.total__row}>
                <div className={styles.total__text}>Order Total</div>
                <div className={styles.total__price}>$305.89</div>
              </div>
              <button className={styles.total__button}>Pay now</button>
            </div>
            <div className={styles.secure}>
              <div className={styles.secure__item}>
                <div className={styles.secure__icon}>
                  <Image width={24} height={24} src="/assets/order-summary/01.svg" alt="icon" />
                </div>
                <div className={styles.secure__text}>Secure SSL encrypted payment.</div>
              </div>
              <div className={styles.secure__item}>
                <div className={styles.secure__icon}>
                  <Image width={24} height={24} src="/assets/order-summary/02.svg" alt="icon" />
                </div>
                <div className={styles.secure__text}>
                  30-day money back guarantee. Read our{' '}
                  <Link className={styles.secure__link} href={'/'}>
                    Refund Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
export default HomePage;
