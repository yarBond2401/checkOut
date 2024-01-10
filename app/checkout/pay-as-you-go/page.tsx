import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import { getPaymentInfo } from '@/services/checkout/getPaymentInfo';
import { getUserIp } from '@/services/checkout/getUserIp';
import Checkout from '@/modules/Checkout';
import { getDataClientToken } from '@/services/checkout/getDataClientToken';

const PayAsYouGoPage = async () => {
  const standartPaymentData = await getPaymentInfo();
  const countryName = await getUserIp();
  const dataClientToken = await getDataClientToken();

  return (
    <Checkout dataClientToken={dataClientToken} pricingPlan={PricingPlanEnum.PAY_AS_GO} countryName={countryName} standartPaymentData={standartPaymentData} />
  );
};
export default PayAsYouGoPage;
