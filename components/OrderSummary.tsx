import React, { useState, useEffect } from 'react';
import styles from '../styles/main.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import PaymentButton from './PaymentButton';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { toFixedFunc } from '@/store/utils/utils';
import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import { setDiscountCodeText, setDiscountPrice, setPrice, setTotalByDiscountCode } from '@/store/reducers/pricingReducer';
import { useAppSnakbar } from '@/hooks/use-app-snackbar';

const OrderSummary: React.FC = () => {
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const { paymentMethod } = useAppSelector((state) => state.mainReducer);
  const {
    pricingPlan,
    currentHours,
    totalPrice,
    subtotalPrice,
    discountPrice,
    discountCodeText,
    standartPaymentData: { hourly, monthly, platformFee, promocodes },
  } = useAppSelector((state) => state.pricingReducer);
  const { snackbarShow } = useAppSnakbar();
  const dispatch = useAppDispatch();

  const platformFeePrice = toFixedFunc((subtotalPrice * platformFee) / 100);
  const itemPrice = pricingPlan === PricingPlanEnum.MONTHLY ? monthly : hourly;
  const currentItemsString = `${currentHours} ${pricingPlan === PricingPlanEnum.MONTHLY ? 'months' : 'hours'} x $${itemPrice} `;


  const handleDiscountApply = () => {
    if (discountCodeText) {
      const elem = Object.keys(promocodes).find((el) => el === discountCodeText);
      if (elem) {
        const value = promocodes[elem];
        if (discountPercent) return;
        dispatch(setTotalByDiscountCode(value));
        setDiscountPercent(value);
      } else {
        setDiscountPercent(0);
        dispatch(setPrice());
        dispatch(setDiscountPrice(0));
      }
    }
  };

  useEffect(() => {
    setDiscountPercent(0);
    dispatch(setDiscountPrice(0));
    dispatch(setDiscountCodeText(''));
  }, [pricingPlan]);

  useEffect(() => {
    if (currentHours < 10 && pricingPlan === PricingPlanEnum.PAY_AS_GO) {
      dispatch(setPrice(10));
    } else if (currentHours < 1 && pricingPlan === PricingPlanEnum.MONTHLY) {
      dispatch(setPrice(1));
    } else if (currentHours > 160 && pricingPlan === PricingPlanEnum.PAY_AS_GO) {
      dispatch(setPrice(160));
    } else if (currentHours > 12 && pricingPlan === PricingPlanEnum.MONTHLY) {
      dispatch(setPrice(12));
    } else {
      dispatch(setPrice());
    }
  }, [currentHours]);

  return (
    <div className={styles.orderSummary}>
      <div className={styles.discount}>
        <input
          value={discountCodeText}
          onChange={(e) => dispatch(setDiscountCodeText(e.target.value))}
          type="text"
          className={styles.discount__input}
          placeholder="Gift or discount code"
        />
        <button onClick={handleDiscountApply} type="button" className={styles.discount__button}>
          Apply
        </button>
      </div>
      <div className={styles.order_divider}></div>
      <div className={styles.total}>
        {discountPercent !== 0 && discountPrice !== 0 && (
          <div className={styles.total__row}>
            <div className={styles.total__text}>Discount Code ({discountPercent}%)</div>
            <div className={styles.total__text}>-${discountPrice}</div>
          </div>
        )}
        <div className={styles.total__row}>
          <div className={styles.total__text}>Subtotal ({currentItemsString})</div>
          <div className={styles.total__text}>${subtotalPrice}</div>
        </div>
        <div style={{ marginBottom: 32 }} className={styles.total__row}>
          <div className={styles.total__text}>Platform fee ({platformFee}%)</div>
          <div className={styles.total__text}>${platformFeePrice}</div>
        </div>
        <div className={styles.order_divider}></div>
        <div className={styles.total__row}>
          <div className={styles.total__text}>Order Total</div>
          <div className={styles.total__price}>${totalPrice}</div>
        </div>
        <div>
          {paymentMethod === PaymentMethodEnum.PAYPAL ? (
            <div style={{ marginBottom: 23 }}>
              <PaymentButton />
            </div>
          ) : (
            <button onClick={() => snackbarShow()} className={styles.total__button}>Pay now</button>
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
