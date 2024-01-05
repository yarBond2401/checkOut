import { PricingPlanEnum } from '@/models/PricingPlanEnum';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface mainReducer {
  pricingPlan: PricingPlanEnum;
  hours: number;
}

const initialState: mainReducer = {
  pricingPlan: PricingPlanEnum.PAY_AS_GO,
  hours: 10,
};

const pricingPlanSlice = createSlice({
  name: 'pricingPlanReducer',
  initialState,
  reducers: {
    setHours(state, action: PayloadAction<number>) {
      state.hours = action.payload;
    },

    decreaseNum(state) {
      if (state.hours <= 10 && state.pricingPlan === PricingPlanEnum.PAY_AS_GO) return;
      if (state.hours <= 1 && state.pricingPlan === PricingPlanEnum.MONTHLY) return;
      state.hours = state.hours - 1;
    },

    increaseNum(state) {
      if (state.hours >= 160 && state.pricingPlan === PricingPlanEnum.PAY_AS_GO) return;
      if (state.hours >= 12 && state.pricingPlan === PricingPlanEnum.MONTHLY) return;
      state.hours = state.hours + 1;
    },

    handleHoursInputBlur(state, action: PayloadAction<number>) {
      const value = action.payload;
      if (value < 10 && state.pricingPlan === PricingPlanEnum.PAY_AS_GO) state.hours = 10;
      if (value < 1 && state.pricingPlan === PricingPlanEnum.MONTHLY) state.hours = 1;
      if (value > 160 && state.pricingPlan === PricingPlanEnum.PAY_AS_GO) state.hours = 160;
      if (value > 12 && state.pricingPlan === PricingPlanEnum.MONTHLY) state.hours = 12;
    },

    handleSetOrderVariant(state, action: PayloadAction<PricingPlanEnum>) {
      const variant = action.payload;
      if (variant === PricingPlanEnum.PAY_AS_GO) {
        state.hours = 10;
      } else if (variant === PricingPlanEnum.MONTHLY) {
        state.hours = 1;
      }
      state.pricingPlan = variant;
    },
  },
});

export const { setHours, handleHoursInputBlur, handleSetOrderVariant, decreaseNum, increaseNum } = pricingPlanSlice.actions;

export default pricingPlanSlice.reducer;
