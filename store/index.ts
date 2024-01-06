import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducers/mainReducer';
import pricingReducer from './reducers/pricingReducer';

const rootReducer = combineReducers({
  mainReducer,
  pricingReducer,
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
