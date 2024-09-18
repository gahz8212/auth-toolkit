import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type State = {
  [key: string]: string | number | {};
  type: string;
  toCurrency: string;
  fromCurrency: string;
  resultCurrency: number;
  status: {
    [key: string]: string | boolean;
    message: string;
    error: string;
    loading: boolean;
  };
};
const initialState: State = {
  toCurrency: "krw",
  fromCurrency: "eur",
  type: "",
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
export const currencyData = createSelector(
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
    searchCurrency: (
      state,
      action: PayloadAction<{ toCurrency: string; fromCurrency: string }>
    ) => {
      state.status.message = "";
      state.status.error = "";
      state.status.loading = true;
    },
    searchCurrencySuccess: (state, { payload: resultCurrency }) => {
      state.status.message = "search currency_ok";
      state.status.loading = false;
      state.resultCurrency = resultCurrency;
    },
    searchCurrencyFailure: (state, { payload: error }) => {
      state.status.loading = false;
      state.status.error = error;
    },
    changeCurrency: (state, { payload: currencies }) => {
      const { type, currency } = currencies;
      state[type] = currency;
    },
  },
});
export default currencySlice.reducer;
export const currencyActions = currencySlice.actions;
