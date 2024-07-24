import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  relate_view:
    | {
        [key: string]: number | string;
        currentId: number;
        itemName: string;
        top: number;
        left: number;
        point: number;
        sum_im_price: number;
        ex_price: number;
      }[]
    | null;
  relate_view_horizon:
    | {
        [key: string]: number | string;
        currentId: number;
        itemName: string;
        top: number;
        left: number;
        point: number;
        sum_im_price: number;
        ex_price: number;
      }[]
    | null;
  relate_price:
    | {
        currentId: number;
        im_price: number;
      }[]
    | null;
};
const initialState: State = {
  relate_view: null,
  relate_view_horizon: null,
  relate_price: null,
};
const viewSelector = (state: RootState) => {
  return state.relate.relate_view;
};
const priceSelector = (state: RootState) => {
  return state.relate.relate_price;
};
export const relateData = createSelector(
  viewSelector,
  priceSelector,
  (relate_view, relate_price) => ({ relate_view, relate_price })
);
const relateSlice = createSlice({
  name: "relate",
  initialState,
  reducers: {
    initRelate: (state) => {
      state.relate_view = initialState.relate_view;
      state.relate_price = initialState.relate_price;
    },
    insertRelation_view: (state, { payload: relate }) => {
      // console.log("relate", relate);
      state.relate_view = relate;
    },
    insertRelation_view_horizon: (state, { payload: relate }) => {
      // console.log("relate", relate);
      state.relate_view_horizon = relate;
    },
    insertRelation_price: (state, { payload: relate }) => {
      state.relate_price = relate;
    },
    addCountRelateView: (state, { payload: itemId }) => {
      if (state.relate_view) {
      }
    },
    removeCountRelateView: (state, { payload: idx }) => {
      if (state.relate_view) {
        state.relate_view[idx].point -= 1;
      }
    },
  },
});
export default relateSlice.reducer;
export const relateActions = relateSlice.actions;
