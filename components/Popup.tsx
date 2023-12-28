import React, { useState, useEffect } from 'react';
import styles from '../styles/popup.module.scss';
import { RxCross1 } from 'react-icons/rx';

interface PopupProps {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<PopupProps> = ({ setPopup }) => {
  const orderNumber = '123RGR231567Y';

  return (
    <div className={styles.popup}>
      <div className={styles.container}>
        <button onClick={() => setPopup(false)} className={styles.closeButton}>
          <RxCross1 />
        </button>
        <div className={styles.body}>
          <div className={styles.check}>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
              <path d="M36.3996 13.5L16.5997 33.2999L7.59949 24.3" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div className={styles.thankText}>Thank You For Your Order</div>
          <div className={styles.mainText}>
            Order #{orderNumber} <br /> Confirmed
          </div>
          <button className={styles.subminButton}>Submit</button>
          <button className={styles.receiptButton}>Generate Receipt</button>
        </div>
      </div>
    </div>
  );
};
export default Popup;
