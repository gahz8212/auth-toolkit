import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  orderFile: ArrayBuffer | undefined | null;
  orderData: any[] | null;
  status: { error: string; loading: boolean; message: string };
};
const initialState: State = {
  orderFile: null,
  orderData: null,
  status: { error: "", loading: false, message: "" },
};
const orderSelector = (state: RootState) => {
  return state.order.orderData;
};
export const OrderData = createSelector(orderSelector, (orderData) => ({
  orderData,
}));
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
    inputOrder: (state, action: PayloadAction<any[] | null>) => {
      state.status.loading = true;
      state.status.error = "";
    },
    inputOrderSuccess: (state, { payload: message }) => {
      state.status.loading = false;
      state.status.error = "";
      state.status.message = message;
    },
    inputOrderFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.loading = false;
      state.status.message = "";
    },
  },
});
export default orderSlice.reducer;
export const OrderAction = orderSlice.actions;
