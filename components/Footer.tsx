import React from 'react';
import styles from '../styles/footer.module.scss';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <div>
            <img src="/assets/footer/01.png" alt="Company Logotype" />
          </div>
          <div>
            <img src="/assets/footer/02.png" alt="Company Logotype" />
          </div>
          <div>
            <img src="/assets/footer/03.png" alt="Company Logotype" />
          </div>
          <div>
            <img src="/assets/footer/04.png" alt="Company Logotype" />
          </div>
        </div>
        <div className={styles.reference}>
          Powered by{' '}
          <span className={styles.reference_gray}>
            Stripe | <Link style={{padding: '0 5px'}} target='_blank' href={'https://eleganttechbd.com/terms-and-conditions/'}>Terms</Link>
            <Link style={{padding: '0 5px'}} target='_blank' href={'https://eleganttechbd.com/privacy-policy/'}>Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
