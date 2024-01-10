import { EMAIL_REG_EXP } from '@/constants/emailRegularExp';
import useAppSelector from './use-app-selector';
import useAppDispatch from './use-app-dispatch';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import { setSnackbarText } from '@/modules/Checkout/store/reducers/mainReducer';
import { number } from 'card-validator';
import { CardNumberVerification } from 'card-validator/dist/card-number';
import { cvv } from 'card-validator';
import { Verification } from 'card-validator/dist/types';
import { expirationDate } from 'card-validator';
import { ExpirationDateVerification } from 'card-validator/dist/expiration-date';

export const useAppSnakbar = () => {
  const {
    isAgree,
    paymentMethod,
    formData: { firstName, lastName, email, confirmEmail, phoneNumber, cardNumber, cvv: cvvText, expiration },
  } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  const isCardDataValid = () => {
    const cardNumberValue = cardNumber.replace(/\s/g, '');
    const expirationValue = expiration.replace(/\s/g, '');

    const CVCverify: Verification = cvv(cvvText);
    const cardNumberValidator: CardNumberVerification = number(cardNumberValue);
    const epirationDate: ExpirationDateVerification = expirationDate(expirationValue);

    if ((cardNumberValue && !cardNumberValidator.isPotentiallyValid) || !cardNumberValidator.isValid) {
      return false;
    }
    if ((expirationValue && !epirationDate.isPotentiallyValid) || !epirationDate.isValid) {
      return false;
    }
    if ((cvvText && !CVCverify.isPotentiallyValid) || !CVCverify.isValid) {
      return false;
    }
    return true;
  };

  const setTrue = () => {
    if (!document) return;
    const section = document.getElementById('section');
    if (section) {
      setTimeout(() => section.scrollIntoView({ block: 'start', behavior: 'smooth' }), 10);
    }
  };

  const snackbarShow = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !confirmEmail ||
      !phoneNumber ||
      !isAgree ||
      (paymentMethod === PaymentMethodEnum.CREDIT_CARD && (!cardNumber || !cvvText || !expiration || !isCardDataValid()))
    ) {
      setTrue();
      if (paymentMethod === PaymentMethodEnum.CREDIT_CARD && (!cardNumber || !cvvText || !expiration || !isCardDataValid())) {
        dispatch(setSnackbarText(['Unfortunately, Your Credit Card Details Are Not Valid.']));
        return false;
      }
      if (!firstName || !lastName || !email) {
        dispatch(
          setSnackbarText([
            !firstName ? 'Billing First Name Is A Required Field.' : null,
            !lastName ? 'Billing First Name Is A Required Field.' : null,
            !email ? 'Billing First Name Is A Required Field.' : null,
            'Billing Confirm Email Is A Required Field.',
            'Billing Phone Is A Required Field.',
            !isAgree ? 'Please Read And Accept The Terms And Conditions To Proceed With Your Order.' : null,
          ])
        );
        return false;
      }
      if (!isAgree) {
        dispatch(setSnackbarText(['Please Read And Accept The Terms And Conditions To Proceed With Your Order.']));
        return false;
      }
      if (confirmEmail !== email) {
        dispatch(setSnackbarText(['Email Adress Is Not Matched.']));
        return false;
      }
      if (EMAIL_REG_EXP.test(email)) {
        dispatch(setSnackbarText(['Invalid Email']));
        return false;
      }
      dispatch(
        setSnackbarText([
          !phoneNumber ? 'Billing Phone Is A Required Field.' : null,
          !confirmEmail ? 'Billing Confirm Email Is A Required Field.' : null,
          !isAgree ? 'Please Read And Accept The Terms And Conditions To Proceed With Your Order.' : null,
        ])
      );
      return false;
    }

    dispatch(setSnackbarText([]));
    return true;
  };

  return { snackbarShow };
};
