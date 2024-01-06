import React from 'react';
import styles from '../styles/main.module.scss';
import clsx from 'clsx';
import useAppDispatch from '@/hooks/use-app-dispatch';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface CustomInputProps {
  label: string;
  id: 'firstName' | 'lastName' | 'email' | 'cardNumber' | 'expiration' | 'cvv' | 'confirmEmail' | 'country' | 'phoneNumber';
  placeholder: string;
  isRequired: boolean;
  type?: string;
  value: string;
  onChangeCallback: ActionCreatorWithPayload<string, any>;
}
const CustomInput: React.FC<CustomInputProps> = ({ label, id, placeholder, isRequired, type = 'text', value, onChangeCallback }) => {
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(onChangeCallback(value));
  };

  return (
    <div className={clsx(styles.input, { [styles.input__mb26]: isRequired })}>
      <label className={clsx(styles.input__label, { [styles.input__label_noReq]: !isRequired })} htmlFor={id}>
        {label}
      </label>
      <input
        onChange={(e) => onChange(e)}
        value={value}
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
