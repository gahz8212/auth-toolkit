import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type State = {
  [key: string]: string | number | {} | null;
  endPoint: string;
  fromCurrency: string;
  resultCurrency: {} | null;

  status: {
    [key: string]: string | boolean;
    message: string;
    error: string;
    loading: boolean;
  };
};
const initialState: State = {
  endPoint: "usd",
  fromCurrency: "krw",
  resultCurrency: null,
  status: { message: "", error: "", loading: false },
};
const endPointSelector = (state: RootState) => {
  return state.currency.endPoint;
};
const resultSelector = (state: RootState) => {
  return state.currency.resultCurrency;
};
const currencyStatusSelector = (state: RootState) => {
  return state.currency.status;
};
export const currencyData = createSelector(
  endPointSelector,
  resultSelector,
  currencyStatusSelector,
  (endPoint, resultCurrency, status) => ({
    endPoint,
    resultCurrency,
    status,
  })
);
const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    searchCurrency: (state, action: PayloadAction<{ endPoint: string }>) => {
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
    changeCurrency: (state, { payload: select }) => {
      state.endPoint = select;
    },
  },
});
export default currencySlice.reducer;
export const currencyActions = currencySlice.actions;
