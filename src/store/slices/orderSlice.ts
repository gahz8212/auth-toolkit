import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  orderFile: ArrayBuffer | undefined | null;
  orderData: any[] | null;
  months: string[] | null;
  invoiceData: any[] | null;
  status: { error: string; loading: boolean; message: string };
};
const initialState: State = {
  orderFile: null,
  orderData: null,
  months: null,
  invoiceData: null,
  status: { error: "", loading: false, message: "" },
};
const orderSelector = (state: RootState) => {
  return state.order.orderData;
};
const monthSelector = (state: RootState) => {
  return state.order.months;
};
const invoiceSelector = (state: RootState) => {
  return state.order.invoiceData;
};
export const OrderData = createSelector(
  orderSelector,
  monthSelector,
  invoiceSelector,
  (orderData, months, invoiceData) => ({
    orderData,
    months,
    invoiceData,
  })
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    initForm: (state) => {
      state.orderData = initialState.orderData;
    },
    changeFile: (state, { payload: file }) => {
      state.orderData = file;
    },
    getData: (state, { payload: data }) => {
      state.orderData = data;
    },
    getMonth: (state, { payload: months }) => {
      state.months = months;
    },
    inputOrder: (state, action: PayloadAction<any[] | null>) => {
      state.status.loading = true;
      state.status.error = "";
    },
    inputOrderSuccess: (state, { payload: invoice }) => {
      state.status.loading = false;
      state.status.error = "";
      state.invoiceData = invoice;
    },
    inputOrderFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.loading = false;
      state.status.message = "";
    },
    inputGood: (state, action: PayloadAction<any[] | null>) => {
      state.status.loading = true;
      state.status.error = "";
    },
    inputGoodSuccess: (state, { payload: message }) => {
      state.status.loading = false;
      state.status.error = "";
      state.status.message = message;
    },
    inputGoodFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.loading = false;
      state.status.message = "";
    },
  },
});
export default orderSlice.reducer;
export const OrderAction = orderSlice.actions;
