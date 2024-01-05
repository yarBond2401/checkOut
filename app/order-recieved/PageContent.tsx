import React from 'react';
import styles from '../../styles/success-page.module.scss';
import useAppSelector from '@/hooks/use-app-selector';
import Popup from '@/components/Popup';

const OrderRecievedSection: React.FC = ({}) => {
  const { isPopup } = useAppSelector((state) => state.mainReducer);
  const product = 'Pay As You Go';
  const hours = 10;
  const subtotal = '$299.90';
  const platformFee = '$6.00';
  const paymentMethod = 'Credit Cards';
  const total = '$305.90';
  const date = 'January 5, 2024';
  const orderNumber = '14895';

  return (
    <div className={styles.section}>
      {isPopup && <Popup />}
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.thankText}>Thank You. Your Order Has Been Received.</div>
          <div className={styles.topData}>
            <div className={styles.topData__item}>
              <div className={styles.topData__label}>ORDER NUMBER:</div>
              <div className={styles.topData__value}>{orderNumber}</div>
            </div>
            <div className={styles.topData__item}>
              <div className={styles.topData__label}>DATE:</div>
              <div className={styles.topData__value}>{date}</div>
            </div>
            <div className={styles.topData__item}>
              <div className={styles.topData__label}>TOTAL:</div>
              <div className={styles.topData__value}>{total}</div>
            </div>
            <div className={styles.topData__item}>
              <div className={styles.topData__label}>PAYMENT METHOD:</div>
              <div className={styles.topData__value}>{paymentMethod}</div>
            </div>
          </div>
          <div style={{ borderRight: 'none' }} className={styles.titleWrapper}>
            <h1 className={styles.title}>Order Details</h1>
          </div>
          <div className={styles.labels}>
            <div className={styles.labels__item}>Product</div>
            <div className={styles.labels__product}>
              <span className={styles.blue}>{product}</span>x{hours}
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
              <div className={styles.values__item}>{platformFee}</div>
              <div className={styles.values__item}>{paymentMethod}</div>
              <div className={styles.values__item}>{total}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderRecievedSection;
