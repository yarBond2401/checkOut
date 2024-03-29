import React from 'react';
import styles from '../styles/main.module.scss';
import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import clsx from 'clsx';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import useAppDispatch from '@/modules/Checkout/hooks/use-app-dispatch';
import { decreaseNum, handleHoursInputBlur, handleSetOrderVariant, increaseNum, setHours } from '@/modules/Checkout/store/reducers/pricingReducer';
import useAppSelector from '@/modules/Checkout/hooks/use-app-selector';

const PricingPlan: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pricingPlan, currentHours } = useAppSelector((state) => state.pricingReducer);

  const handleHoursInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    dispatch(setHours(value));
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    dispatch(handleHoursInputBlur(value));
  };

  return (
    <div className={styles.pricingPlan}>
      <div className={styles.order__variants}>
        <button
          type="button"
          onClick={() => dispatch(handleSetOrderVariant(PricingPlanEnum.PAY_AS_GO))}
          className={clsx(styles.order__variant, { [styles.order__variant_active]: pricingPlan === PricingPlanEnum.PAY_AS_GO })}
        >
          <div className={styles.order__head}>
            <div className={styles.order__radio}>
              {pricingPlan === PricingPlanEnum.PAY_AS_GO ? (
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
          onClick={() => dispatch(handleSetOrderVariant(PricingPlanEnum.MONTHLY))}
          className={clsx(styles.order__variant, { [styles.order__variant_active]: pricingPlan === PricingPlanEnum.MONTHLY })}
        >
          <div className={styles.order__head}>
            <div className={styles.order__radio}>
              {pricingPlan === PricingPlanEnum.MONTHLY ? (
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
          <h3 className={styles.hours__title}>{pricingPlan === PricingPlanEnum.PAY_AS_GO ? 'Pay as you go' : 'Monthly'}</h3>
          <div className={styles.hours__buttons}>
            <button type="button" onClick={() => dispatch(decreaseNum())} className={styles.hours__minusButton}>
              <AiOutlineMinus />
            </button>
            <input
              maxLength={4}
              type="text"
              value={currentHours}
              onBlur={handleBlur}
              onChange={(e) => handleHoursInputChange(e)}
              className={styles.hours__input}
            />
            <button onClick={() => dispatch(increaseNum())} type="button" className={styles.hours__plusButton}>
              <AiOutlinePlus />
            </button>
          </div>
        </div>
        <div className={styles.hours__reference}>
          {pricingPlan === PricingPlanEnum.PAY_AS_GO ? '*Enter Manually hours between 10 to 160' : '*You can also enter month manually between 1 to 12'}
        </div>
      </div>
      <div style={{ marginBottom: 32 }} className={styles.order_divider}></div>
    </div>
  );
};
export default PricingPlan;
