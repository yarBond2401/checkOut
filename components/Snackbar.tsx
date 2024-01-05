import React, { useState, useEffect } from 'react';
import styles from '../styles/main.module.scss';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { IForm } from '@/models/IForm';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import useAppSelector from '@/hooks/use-app-selector';

interface SnackbarProps {
  control: Control<IForm, any>;
}

const Snackbar: React.FC<SnackbarProps> = () => {
  const { snackbarText } = useAppSelector((state) => state.mainReducer);

  return (
    <>
      {snackbarText.length ? (
        <div className={styles.snackbar}>
          <div className={styles.snackbar__icon}>
            <RiErrorWarningFill />
          </div>
          <div className={styles.snackbar__text}>
            {snackbarText.map((el, index) => (
              <div className={styles.snackbar__textElem} key={index}>
                {el}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Snackbar;
