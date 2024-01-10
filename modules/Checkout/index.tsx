import MainSection from '@/modules/Checkout/components/MainSection';
import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import StoreProvider from '@/modules/Checkout/providers/StoreProvider';
import { IStandartPaymentData } from '@/models/paymentInfo/IStandartPaymentData';

interface CheckoutProps {
  countryName: string;
  standartPaymentData: IStandartPaymentData;
  pricingPlan: PricingPlanEnum;
  dataClientToken: string;
}

const Checkout: React.FC<CheckoutProps> = ({ countryName, standartPaymentData, pricingPlan, dataClientToken }) => {
  return (
    <StoreProvider>
      <MainSection dataClientToken={dataClientToken} pricingPlan={pricingPlan} countryName={countryName} standartPaymentData={standartPaymentData} />
    </StoreProvider>
  );
};
export default Checkout;
