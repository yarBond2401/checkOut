import MainSection from '@/components/MainSection';
import React from 'react';
import StoreProvider from '../providers/StoreProvider';

const HomePage: React.FC = () => {
  return (
    <StoreProvider>
      <MainSection />
    </StoreProvider>
  );
};
export default HomePage;
