import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  orderFile: ArrayBuffer | undefined | null;
  orderData: any[] | null;
  // packingData: any[] | null;
  palletData: {
    [key: number]: {
      [key: string]: string | number;
      item: string;
      amount: number;
    }[];
  };
  months: string[] | null;
  dummyItems: any[] | null;

  status: { error: string; loading: boolean; message: string };
};
const initialState: State = {
  orderFile: null,
  orderData: null,
  // packingData: null,
  palletData: {
    0: [{ item: "", amount: 0 }],
    1: [{ item: "", amount: 0 }],

    2: [{ item: "", amount: 0 }],

    3: [{ item: "", amount: 0 }],

    4: [{ item: "", amount: 0 }],

    5: [{ item: "", amount: 0 }],

    6: [{ item: "", amount: 0 }],

    7: [{ item: "", amount: 0 }],

    8: [{ item: "", amount: 0 }],

    9: [{ item: "", amount: 0 }],
  },
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
const palletSelector = (state: RootState) => {
  return state.order.palletData;
};
export const OrderData = createSelector(
  orderSelector,
  monthSelector,
  dummyItemSelector,
  palletSelector,
  (orderData, months, dummyItems, palletData) => ({
    orderData,
    months,
    dummyItems,
    palletData,
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
      // state.packingData = order;
      state.months = Object.keys(order[0]).slice(1, 6);
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
    settingPallet: (state, { payload: packingData }) => {
      const { pNo, itemData } = packingData;
      console.log("pNo", pNo + 1, "itemData", itemData);
      // console.log("result", state.palletData[0][1].item);
      state.palletData[pNo].push(itemData);
    },
  },
});
export default orderSlice.reducer;
export const OrderAction = orderSlice.actions;
