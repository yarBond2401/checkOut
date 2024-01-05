import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface mainReducer {
  paymentMethod: PaymentMethodEnum;
  discountCode: string;
  isAgree: boolean;
  isSubscribe: boolean;
  isPopup: boolean;
  price: number;
  snackbarText: (string | undefined)[];
}

const initialState: mainReducer = {
  paymentMethod: PaymentMethodEnum.CREDIT_CARD,
  discountCode: '',
  isPopup: false,
  price: 20,
  isSubscribe: false,
  isAgree: false,
  snackbarText: [],
};

const mainSlice = createSlice({
  name: 'mainReducer',
  initialState,
  reducers: {
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

    setSnackbarText(state, action: PayloadAction<(string | undefined)[]>) {
      state.snackbarText = action.payload;
    },

    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
  },
});

export const { setPaymentMethod, setDiscountCode, setAgree, setSubscribe, setPopup, setPrice, setSnackbarText } = mainSlice.actions;

export default mainSlice.reducer;
