import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface mainReducer {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    cardNumber: string;
    expiration: string;
    cvv: string;
    country: string;
    phoneNumber: string;
  };
  paymentMethod: PaymentMethodEnum;
  isAgree: boolean;
  isSubscribe: boolean;
  snackbarText: (string | null)[];
  successOrderId: number | undefined;
}

const initialState: mainReducer = {
  paymentMethod: PaymentMethodEnum.CREDIT_CARD,
  isSubscribe: false,
  isAgree: false,
  snackbarText: [],
  successOrderId: undefined,
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
    country: '',
    phoneNumber: '',
  },
};

const mainSlice = createSlice({
  name: 'mainReducer',
  initialState,
  reducers: {
    setPaymentMethod(state, action: PayloadAction<PaymentMethodEnum>) {
      state.paymentMethod = action.payload;
      state.snackbarText = [];
    },

    setAgree(state) {
      state.isAgree = !state.isAgree;
    },

    setSubscribe(state) {
      state.isSubscribe = !state.isSubscribe;
    },

    setSnackbarText(state, action: PayloadAction<(string | null)[]>) {
      state.snackbarText = action.payload;
    },
    /* ============================================================================================================================= */
    setFirstName(state, action: PayloadAction<string>) {
      state.formData.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.formData.lastName = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.formData.email = action.payload;
    },
    setConfirmEmail(state, action: PayloadAction<string>) {
      state.formData.confirmEmail = action.payload;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.formData.country = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.formData.phoneNumber = action.payload;
    },
    setCardNumber(state, action: PayloadAction<string>) {
      state.formData.cardNumber = action.payload;
    },
    setExpiration(state, action: PayloadAction<string>) {
      state.formData.expiration = action.payload;
    },
    setCvv(state, action: PayloadAction<string>) {
      state.formData.cvv = action.payload;
    },

    setSuccessOrderId(state, action: PayloadAction<number | undefined>) {
      state.successOrderId = action.payload;
    },
  },
});

export const {
  setSuccessOrderId,
  setPaymentMethod,
  setAgree,
  setSubscribe,
  setSnackbarText,

  setFirstName,
  setCardNumber,
  setConfirmEmail,
  setCountry,
  setCvv,
  setEmail,
  setExpiration,
  setLastName,
  setPhoneNumber,
} = mainSlice.actions;

export default mainSlice.reducer;
