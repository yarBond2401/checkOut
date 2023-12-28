import React, { useState, useEffect } from 'react';
import styles from '../styles/main.module.scss';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { IForm } from '@/models/IForm';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';

interface SnackbarProps {
  errors: FieldErrors<IForm>;
  control: Control<IForm, any>;
  isAgree: boolean;
  paymentMethod: PaymentMethodEnum;
}

const Snackbar: React.FC<SnackbarProps> = ({ errors, isAgree, paymentMethod }) => {
  console.log('errrors', errors);
  const getSnackbarText = () => {
    if (paymentMethod === PaymentMethodEnum.CREDIT_CARD && (errors.cardNumber || errors.cvv || errors.email)) {
      return ['Unfortunately, Your Credit Card Details Are Not Valid.'];
    }
    if (paymentMethod === PaymentMethodEnum.PAYPAL && (errors.firstName || errors.lastName || errors.email)) {
      return [
        errors.firstName?.message,
        errors.lastName?.message,
        errors.email?.message,
        'Billing Confirm Email Is A Required Field.',
        'Billing Phone Is A Required Field.',
        !isAgree ? 'Please Read And Accept The Terms And Conditions To Proceed With Your Order.' : null,
      ];
    }
    if (paymentMethod === PaymentMethodEnum.CREDIT_CARD && !(errors.cardNumber || errors.cvv || errors.email) && !isAgree) {
      return ['Please Read And Accept The Terms And Conditions To Proceed With Your Order.'];
    }

    return ['Some error has happened'];
  };
  return (
    <div className={styles.snackbar}>
      <div className={styles.snackbar__icon}>
        <RiErrorWarningFill />
      </div>
      <div className={styles.snackbar__text}>
        {getSnackbarText().map((el, index) => (
          <div className={styles.snackbar__textElem} key={index}>
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Snackbar;
