import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import { IStandartPaymentData } from '@/models/paymentInfo/IStandartPaymentData';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toFixedFunc } from '../utils/utils';

interface mainReducer {
  pricingPlan: PricingPlanEnum;
  currentHours: number;
  standartPaymentData: IStandartPaymentData;
  subtotalPrice: number;
  totalPrice: number;
  discountPrice: number;
  discountCodeText: string;
}

const initialState: mainReducer = {
  standartPaymentData: {
    id: 0,
    hourly: 0,
    monthly: 0,
    platformFee: 0,
    promocodes: {},
    createdAt: '',
    updatedAt: '',
  },
  pricingPlan: PricingPlanEnum.PAY_AS_GO,
  currentHours: 10,
  subtotalPrice: 0,
  totalPrice: 0,
  discountPrice: 0,
  discountCodeText: '',
};

const pricingSlice = createSlice({
  name: 'pricingReducer',
  initialState,
  reducers: {
    setHours(state, action: PayloadAction<number>) {
      state.currentHours = action.payload;
    },

    decreaseNum(state) {
      if (state.currentHours <= 10 && state.pricingPlan === PricingPlanEnum.PAY_AS_GO) return;
      if (state.currentHours <= 1 && state.pricingPlan === PricingPlanEnum.MONTHLY) return;
      state.currentHours -= 1;
    },

    increaseNum(state) {
      if (state.currentHours >= 160 && state.pricingPlan === PricingPlanEnum.PAY_AS_GO) return;
      if (state.currentHours >= 12 && state.pricingPlan === PricingPlanEnum.MONTHLY) return;
      state.currentHours += 1;
    },

    handleHoursInputBlur(state, action: PayloadAction<number>) {
      const value = action.payload;
      if (value < 10 && state.pricingPlan === PricingPlanEnum.PAY_AS_GO) state.currentHours = 10;
      if (value < 1 && state.pricingPlan === PricingPlanEnum.MONTHLY) state.currentHours = 1;
      if (value > 160 && state.pricingPlan === PricingPlanEnum.PAY_AS_GO) state.currentHours = 160;
      if (value > 12 && state.pricingPlan === PricingPlanEnum.MONTHLY) state.currentHours = 12;
    },

    handleSetOrderVariant(state, action: PayloadAction<PricingPlanEnum>) {
      const variant = action.payload;
      if (variant === PricingPlanEnum.PAY_AS_GO) {
        state.currentHours = 10;
      } else if (variant === PricingPlanEnum.MONTHLY) {
        state.currentHours = 1;
      }
      state.pricingPlan = variant;
    },

    setPrice(state, action: PayloadAction<number | undefined>) {
      const hoursQty = action?.payload ? action.payload : state.currentHours;

      if (state.pricingPlan === PricingPlanEnum.PAY_AS_GO) {
        const subtotal = state.standartPaymentData.hourly * hoursQty;
        state.subtotalPrice = toFixedFunc(subtotal);
        state.totalPrice = toFixedFunc(subtotal + (subtotal * state.standartPaymentData.platformFee) / 100);
      } else if (state.pricingPlan === PricingPlanEnum.MONTHLY) {
        const subtotal = state.standartPaymentData.monthly * hoursQty;
        state.subtotalPrice = toFixedFunc(subtotal);
        state.totalPrice = toFixedFunc(subtotal + (subtotal * state.standartPaymentData.platformFee) / 100);
      }
    },

    setDiscountCodeText(state, action: PayloadAction<string>) {
      state.discountCodeText = action.payload;
    },

    setTotalByDiscountCode(state, action: PayloadAction<number>) {
      const value = (state.totalPrice * action.payload) / 100;
      state.totalPrice = toFixedFunc(state.totalPrice - value);
      state.discountPrice = value;
    },

    setDiscountPrice(state, action: PayloadAction<number>) {
      state.discountPrice = toFixedFunc(action.payload);
    },

    setInitialStandartPaymentData(state, action: PayloadAction<IStandartPaymentData>) {
      const subtotal = state.currentHours * action.payload.hourly;
      state.standartPaymentData = action.payload;
      state.subtotalPrice = toFixedFunc(subtotal);
      state.totalPrice = toFixedFunc(subtotal + (subtotal * action.payload.platformFee) / 100);
    },
  },
  extraReducers(builder) {},
});

export const {
  setInitialStandartPaymentData,
  setDiscountPrice,
  setHours,
  handleHoursInputBlur,
  handleSetOrderVariant,
  decreaseNum,
  increaseNum,
  setTotalByDiscountCode,
  setPrice,
  setDiscountCodeText,
} = pricingSlice.actions;

export default pricingSlice.reducer;
