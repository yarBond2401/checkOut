import { IForm } from '@/models/IForm';
import React from 'react';
import { ControllerRenderProps, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import styles from '../styles/main.module.scss';
import clsx from 'clsx';

interface CardInputProps {
  label: string;
  id: string;
  placeholder: string;
  isRequired: boolean;
  hangleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  field: ControllerRenderProps<IForm, any>;
}
const CardInput: React.FC<CardInputProps> = ({ label, id, placeholder, isRequired, field, hangleChange }) => {

  return (
    <div className={styles.input}>
      <label className={clsx(styles.input__label, { [styles.input__label_noReq]: !isRequired })} htmlFor={id}>
        {label}
      </label>
      <input {...field} onChange={hangleChange} className={styles.input__item} id={id} type="text" placeholder={placeholder} />
    </div>
  );
};

export default CardInput;
