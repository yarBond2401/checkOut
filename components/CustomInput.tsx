import { IForm } from "@/models/IForm";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import styles from '../styles/payment.module.scss';
import clsx from "clsx";

interface CustomInputProps {
  label: string;
  id: 'firstName' | 'lastName' | 'email' | 'cardNumber' | 'expiration' | 'cvv' | 'confirmEmail' | 'country' | 'phoneNumber';
  placeholder: string;
  isRequired: boolean;
  register: UseFormRegister<IForm>;
  errors: FieldErrors<IForm>;
}
const CustomInput: React.FC<CustomInputProps> = ({ label, id, placeholder, isRequired, register, errors }) => {
  const fieldIsRequired = 'Field Is Required *';

  return (
    <div className={styles.input}>
      <label className={clsx(styles.input__label, { [styles.input__label_noReq]: !isRequired })} htmlFor={id}>
        {label}
      </label>
      <input
        {...register(id, {
          required: fieldIsRequired,
          // pattern: {
          //   value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
          //   message: 'Please, enter valid email',
          // },
        })}
        // helperText={errors.email?.message}
        className={styles.input__item}
        id={id}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;