import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type State = {
  [key: string]:
    | string
    | number
    | boolean
    | {
        [key: string]: string | boolean;
        message: string;
        error: string;
        loading: boolean;
      };
};
const initialState: State = {
  toCurrency: "krw",
  fromCurrency: "eur",
  resultCurrency: 0,
  status: { message: "", error: "", loading: false },
};
const toCurrencySelector = (state: RootState) => {
  return state.currency.toCurrency;
};
const fromCurrencySelector = (state: RootState) => {
  return state.currency.fromCurrency;
};
const currencyStatusSelector = (state: RootState) => {
  return state.currency.status;
};
export const currency = createSelector(
  toCurrencySelector,
  fromCurrencySelector,
  currencyStatusSelector,
  (toCurrency, fromCurrency, status) => ({
    toCurrency,
    fromCurrency,
    status,
  })
);
const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (
      state,
      action: PayloadAction<{ toCurrency: string; fromCurrency: string }>
    ) => {
      state.status.message = "";
    },
    changeCurrencySuccess: (state, { payload: resultCurrency }) => {
      state.resultCurrency = resultCurrency;
    },
    changeCurrencyFailure: (state, { payload: error }) => {},
  },
});
export default currencySlice.reducer;
export const currencyActions = currencySlice.actions;
