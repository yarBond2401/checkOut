import React from 'react';
import styles from '../styles/main.module.scss';
import clsx from 'clsx';
import { PayPalHostedField } from '@paypal/react-paypal-js';

interface CardInputProps {
  label: string;
  id: string;
  placeholder: string;
  isRequired: boolean;
  hostedFieldType: string;
  selector: string;
}
const CardInput: React.FC<CardInputProps> = ({ label, id, placeholder, isRequired, selector, hostedFieldType }) => {
  return (
    <div className={styles.input}>
      <label className={clsx(styles.input__label, { [styles.input__label_noReq]: !isRequired })} htmlFor={id}>
        {label}
      </label>
      <PayPalHostedField
        options={{
          placeholder,
          selector,
        }}
        className={styles.input__item}
        id={id}
        hostedFieldType={hostedFieldType}
      />
    </div>
  );
};

export default CardInput;
