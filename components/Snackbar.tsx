import React, { useState, useEffect } from 'react';
import styles from '../styles/main.module.scss';
import { RiErrorWarningFill } from 'react-icons/ri';
import useAppSelector from '@/hooks/use-app-selector';


const Snackbar: React.FC = () => {
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
