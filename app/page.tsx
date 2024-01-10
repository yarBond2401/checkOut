import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <div style={{ paddingLeft: 30, marginBottom: 30, textDecoration: 'underline' }}>
        <Link href="/checkout/pay-as-you-go">checkout/pay-as-you-go</Link>
      </div>
      <div style={{ paddingLeft: 30, marginBottom: 30, textDecoration: 'underline' }}>
        <Link href="/checkout/monthly">checkout/monthly</Link>
      </div>
      <div style={{ paddingLeft: 30, marginBottom: 30, textDecoration: 'underline' }}>
        <Link href="/login">login</Link>
      </div>
      <div style={{ paddingLeft: 30, marginBottom: 30, textDecoration: 'underline' }}>
        <Link href="/admin-pannel">admin-pannel</Link>
      </div>
    </div>
  );
};
export default HomePage;
