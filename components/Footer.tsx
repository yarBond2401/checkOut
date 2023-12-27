import React from 'react';
import styles from '../styles/Footer.module.scss';

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
          Powered by <span className={styles.reference_gray}>Stripe | Terms Privacy</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
