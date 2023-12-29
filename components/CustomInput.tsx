import { IForm } from '@/models/IForm';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from '../styles/main.module.scss';
import clsx from 'clsx';

interface CustomInputProps {
  label: string;
  id: 'firstName' | 'lastName' | 'email' | 'cardNumber' | 'expiration' | 'cvv' | 'confirmEmail' | 'country' | 'phoneNumber';
  placeholder: string;
  isRequired: boolean;
  register: UseFormRegister<IForm>;
  regularExpression?: RegExp | null;
  errorMessage: string;
  type?: string;
}
const CustomInput: React.FC<CustomInputProps> = ({ label, id, placeholder, isRequired, register, regularExpression = null, errorMessage, type = 'text' }) => {

  return (
    <div className={clsx(styles.input, { [styles.input__mb26]: isRequired })}>
      <label className={clsx(styles.input__label, { [styles.input__label_noReq]: !isRequired })} htmlFor={id}>
        {label}
      </label>
      <input
        {...register(
          id,
          regularExpression
            ? {
                required: errorMessage,
                pattern: {
                  value: regularExpression,
                  message: `Invalid ${label}`,
                },
              }
            : {
                required: errorMessage,
              }
        )}
        className={styles.input__item}
        id={id}
        type={type}
        placeholder={placeholder}
        min={type === 'number' ? '0' : 'none'}
      />
    </div>
  );
};

export default CustomInput;
