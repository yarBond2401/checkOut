import React, { useState, useEffect } from 'react';
import styles from '../styles/Footer.module.scss';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <Link href={'/'}>
            <img src="/assets/footer/01.png" alt="Company Logotype" />
          </Link>
          <Link href={'/'}>
            <img src="/assets/footer/02.png" alt="Company Logotype" />
          </Link>
          <Link href={'/'}>
            <img src="/assets/footer/03.png" alt="Company Logotype" />
          </Link>
          <Link href={'/'}>
            <img src="/assets/footer/04.png" alt="Company Logotype" />
          </Link>
        </div>
        <div className={styles.reference}>
          Powered by <span className={styles.reference_gray}>Stripe | Terms Privacy</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
