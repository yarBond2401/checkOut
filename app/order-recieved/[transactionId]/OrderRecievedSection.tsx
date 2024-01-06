import React from 'react';
import styles from '../../../styles/success-page.module.scss';
import Popup from '@/components/Popup';
import { IOrderData } from '@/models/paymentInfo/IOrderRecievedData';

interface OrderRecievedSectionProps {
  data: IOrderData;
}

const OrderRecievedSection: React.FC<OrderRecievedSectionProps> = ({ data }) => {
  const dateObject = new Date(data.dateTime);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;
  const formattedDateString = dateObject.toLocaleDateString('en-US', options);
  const subtotal = data.orderTotal - data.platformFee;

  return (
    <div className={styles.section}>
      <Popup transactionID={data.transactionID}/>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.thankText}>Thank You. Your Order Has Been Received.</div>
          <div className={styles.topData}>
            <div className={styles.topData__item}>
              <div className={styles.topData__label}>ORDER NUMBER:</div>
              <div className={styles.topData__value}>{data.transactionID}</div>
            </div>
            <div className={styles.topData__item}>
              <div className={styles.topData__label}>DATE:</div>
              <div className={styles.topData__value}>{formattedDateString}</div>
            </div>
            <div className={styles.topData__item}>
              <div className={styles.topData__label}>TOTAL:</div>
              <div className={styles.topData__value}>{data.orderTotal}</div>
            </div>
            <div className={styles.topData__item}>
              <div className={styles.topData__label}>PAYMENT METHOD:</div>
              <div className={styles.topData__value}>{data.paymentMethod}</div>
            </div>
          </div>
          <div style={{ borderRight: 'none' }} className={styles.titleWrapper}>
            <h1 className={styles.title}>Order Details</h1>
          </div>
          <div className={styles.labels}>
            <div className={styles.labels__item}>Product</div>
            <div className={styles.labels__product}>
              <span className={styles.blue}>{data.pricingPlan}</span>x {data.hours}
            </div>
            <div className={styles.labels__item}>Subtotal:</div>
            <div className={styles.labels__item}>Platform Fee (2%):</div>
            <div className={styles.labels__item}>Payment Method: </div>
            <div className={styles.labels__item}>Total: </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.right__content}>
            <div style={{ borderLeft: 'none' }} className={styles.titleWrapper}></div>
            <div className={styles.values}>
              <div className={styles.values__item}>Total</div>
              <div className={styles.values__item}>{subtotal}</div>
              <div className={styles.values__item}>{subtotal}</div>
              <div className={styles.values__item}>{data.platformFee}</div>
              <div className={styles.values__item}>{data.paymentMethod}</div>
              <div className={styles.values__item}>{data.orderTotal}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderRecievedSection;
