import useAppSelector from './use-app-selector';
import { IForm } from '@/models/IForm';
import { FieldErrors } from 'react-hook-form';
import useAppDispatch from './use-app-dispatch';
import { PaymentMethodEnum } from '@/models/PaymentMethodEnum';
import { setSnackbarText } from '@/store/reducers/mainReducer';

export const useAppSnakbar = () => {
  const { isAgree, paymentMethod } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();
  if (!document) return
  const section = document.getElementById('section');

  const setTrue = () => {
    if (section) {
      setTimeout(() => section.scrollIntoView({ block: 'start', behavior: 'smooth' }), 10);
    }
  };

  const snackbarShow = (errors: FieldErrors<IForm>) => {
    if (Object.keys(errors).length > 0 || !isAgree) {
      setTrue();
      if (paymentMethod === PaymentMethodEnum.CREDIT_CARD && (errors.cardNumber || errors.cvv || errors.expiration)) {
        debugger;
        return dispatch(setSnackbarText(['Unfortunately, Your Credit Card Details Are Not Valid.']));
      }
      if (paymentMethod === PaymentMethodEnum.PAYPAL && (errors.firstName || errors.lastName || errors.email)) {
        debugger;
        return dispatch(
          setSnackbarText([
            errors.firstName?.message,
            errors.lastName?.message,
            errors.email?.message,
            'Billing Confirm Email Is A Required Field.',
            'Billing Phone Is A Required Field.',
            !isAgree ? 'Please Read And Accept The Terms And Conditions To Proceed With Your Order.' : undefined,
          ])
        );
      }
      if (!isAgree) {
        debugger;
        return dispatch(setSnackbarText(['Please Read And Accept The Terms And Conditions To Proceed With Your Order.']));
      }
      return dispatch(setSnackbarText(Object.values(errors).map((el) => el.message)));
    }

    return dispatch(setSnackbarText([]));
  };

  return { snackbarShow };
};
