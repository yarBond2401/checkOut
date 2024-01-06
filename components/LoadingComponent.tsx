import React, { useState, useEffect } from 'react';
import styles from '../styles/loading-component.module.scss';
import Image from 'next/image';

const LoadingComponent: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.preloader}>
          <Image priority width={130} height={130} src={'/assets/preloader/preloader.gif'} alt="preloader" />
        </div>
      </div>
    </div>
  );
};
export default LoadingComponent;
