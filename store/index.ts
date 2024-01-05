import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducers/mainReducer';
import pricingPlanReducer from './reducers/pricingPlanReducer';

const rootReducer = combineReducers({
  mainReducer,
  pricingPlanReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
