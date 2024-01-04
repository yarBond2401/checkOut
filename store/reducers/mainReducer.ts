import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface mainReducer {
  paymentMethod: PaymentMethodEnum;
  pricingPlan: PricingPlanEnum;
  hours: number;
  discountCode: string;
  isAgree: boolean;
  isSubscribe: boolean;
  isPopup: boolean;
  isShowSnackbar: boolean;
  submitClick: number;
  price: number;
}

const initialState: mainReducer = {
  paymentMethod: PaymentMethodEnum.CREDIT_CARD,
  pricingPlan: PricingPlanEnum.PAY_AS_GO,
  hours: 10,
  discountCode: '',
  isAgree: false,
  isSubscribe: false,
  isPopup: false,
  isShowSnackbar: false,
  submitClick: 0,
  price: 20,
};

const mainSlice = createSlice({
  name: 'mainFilters',
  initialState,
  reducers: {
    setHours(state, action: PayloadAction<number>) {
      state.hours = action.payload;
    },

    setPricingPlan(state, action: PayloadAction<PricingPlanEnum>) {
      state.pricingPlan = action.payload;
    },

    setPaymentMethod(state, action: PayloadAction<PaymentMethodEnum>) {
      state.paymentMethod = action.payload;
    },

    setDiscountCode(state, action: PayloadAction<string>) {
      state.discountCode = action.payload;
    },

    setAgree(state) {
      state.isAgree = !state.isAgree;
    },

    setSubscribe(state) {
      state.isSubscribe = !state.isSubscribe;
    },

    setPopup(state, action: PayloadAction<boolean>) {
      state.isPopup = action.payload;
    },

    setShowSnackbar(state, action: PayloadAction<boolean>) {
      state.isShowSnackbar = action.payload;
    },

    setSubmitClick(state, action: PayloadAction<number>) {
      state.submitClick = action.payload;
    },

    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
  },
});

export const { setHours, setPricingPlan, setPaymentMethod, setDiscountCode, setAgree, setSubscribe, setPopup, setPrice, setShowSnackbar, setSubmitClick } =
  mainSlice.actions;

export default mainSlice.reducer;
