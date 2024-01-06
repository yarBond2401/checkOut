import React from 'react';
import styles from '../styles/main.module.scss';
import clsx from 'clsx';

interface CardInputProps {
  label: string;
  id: string;
  placeholder: string;
  isRequired: boolean;
  value: string;
  hangleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CardInput: React.FC<CardInputProps> = ({ label, id, placeholder, isRequired, hangleChange, value }) => {

  return (
    <div className={styles.input}>
      <label className={clsx(styles.input__label, { [styles.input__label_noReq]: !isRequired })} htmlFor={id}>
        {label}
      </label>
      <input onChange={hangleChange} value={value} className={styles.input__item} id={id} type="text" placeholder={placeholder} />
    </div>
  );
};

export default CardInput;
