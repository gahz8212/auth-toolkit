import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  orderFile: ArrayBuffer | undefined | null;
  orderData: any[] | null;
  packingData: any[] | null;
  palletData: any[] | null;
  months: string[] | null;
  dummyItems: any[] | null;

  status: { error: string; loading: boolean; message: string };
};
const initialState: State = {
  orderFile: null,
  orderData: null,
  packingData: null,
  palletData: null,
  months: null,
  dummyItems: null,
  // invoiceData: null,
  status: { error: "", loading: false, message: "" },
};
const orderSelector = (state: RootState) => {
  return state.order.orderData;
};
const monthSelector = (state: RootState) => {
  return state.order.months;
};
const dummyItemSelector = (state: RootState) => {
  return state.order.dummyItems;
};
export const OrderData = createSelector(
  orderSelector,
  monthSelector,
  dummyItemSelector,
  (orderData, months, dummyItems) => ({
    orderData,
    months,
    dummyItems,
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
    inputOrderSuccess: (state, { payload: order }) => {
      state.status.loading = false;
      state.status.error = "";
      state.orderData = order;
      state.packingData = order;
    },
    inputOrderFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.loading = false;
      state.status.message = "";
    },
    getDummyItem: (state) => {
      state.status.loading = true;
      state.status.error = "";
    },
    getDummyItemSuccess: (state, { payload: dummyItems }) => {
      state.status.loading = false;
      state.status.error = "";
      state.dummyItems = dummyItems;
    },
    getDummyItemFailure: (state, { payload: error }) => {
      state.status.loading = false;
      state.status.error = error;
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
    getOrderData: (state) => {
      state.status.error = "";
      state.status.loading = true;
      state.status.message = "";
    },
    getOrderDataSuccess: (state, { payload: invoiceData }) => {
      state.status.error = "";
      state.status.loading = false;
      state.orderData = invoiceData;
    },
    getOrderDataFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.loading = false;
      state.status.message = "";
    },
  },
});
export default orderSlice.reducer;
export const OrderAction = orderSlice.actions;
