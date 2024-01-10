import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import Checkout from '@/modules/Checkout';
import { getDataClientToken } from '@/services/checkout/getDataClientToken';
import { getPaymentInfo } from '@/services/checkout/getPaymentInfo';
import { getUserIp } from '@/services/checkout/getUserIp';

const MonthlyPaymentPage = async () => {
  const standartPaymentData = await getPaymentInfo();
  const countryName = await getUserIp();
  const dataClientToken = await getDataClientToken();

  return (
    <Checkout dataClientToken={dataClientToken} pricingPlan={PricingPlanEnum.MONTHLY} countryName={countryName} standartPaymentData={standartPaymentData} />
  );
};
export default MonthlyPaymentPage;