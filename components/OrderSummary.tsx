import React from 'react';
import styles from '../styles/main.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import PaymentButton from './PaymentButton';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { setDiscountCode } from '@/store/reducers/mainReducer';
import { IForm } from '@/models/IForm';
import { FieldErrors } from 'react-hook-form';

interface OrderSummaryProps {
  snackbarShow: () => {
    payload: (string | undefined)[];
    type: 'mainReducer/setSnackbarText';
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ snackbarShow }) => {
  const dispatch = useAppDispatch();
  const { discountCode, paymentMethod } = useAppSelector((state) => state.mainReducer);


  return (
    <div className={styles.orderSummary}>
      <div className={styles.discount}>
        <input
          value={discountCode}
          onChange={(e) => dispatch(setDiscountCode(e.target.value))}
          type="text"
          className={styles.discount__input}
          placeholder="Gift or discount code"
        />
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
        <div style={{ marginBottom: 32 }} className={styles.total__row}>
          <div className={styles.total__text}>Platform fee (2%)</div>
          <div className={styles.total__text}>$5.99</div>
        </div>
        <div className={styles.order_divider}></div>
        <div className={styles.total__row}>
          <div className={styles.total__text}>Order Total</div>
          <div className={styles.total__price}>$305.89</div>
        </div>
        <div onClick={() => snackbarShow()}>
          {paymentMethod === PaymentMethodEnum.PAYPAL ? (
            <div style={{ marginBottom: 23 }}>
              <PaymentButton />
            </div>
          ) : (
            <button  type="submit" className={styles.total__button}>
              Pay now
            </button>
          )}
        </div>
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
  );
};
export default OrderSummary;
