import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  relate_all: {
    currentId: number;
    top: number;
    left: number;
    im_price: number;
  }[];
  relate_price: {
    currentId: number;
    im_price: number;
  }[];
};
const initialState: State = {
  relate_all: [],
  relate_price: [],
};
const allSelector = (state: RootState) => {
  return state.relate.relate_all;
};
const priceSelector = (state: RootState) => {
  return state.relate.relate_price;
};
export const relateData = createSelector(
  allSelector,
  priceSelector,
  (relate_all, relate_price) => ({ relate_all, relate_price })
);
const relateSlice = createSlice({
  name: "relate",
  initialState,
  reducers: {
    initRelate: (state) => {
      state.relate_all = initialState.relate_all;
      state.relate_price = initialState.relate_price;
    },
    insertRelation_all: (state, { payload: relate }) => {
      state.relate_all = relate;
    },
    insertRelation_price: (state, { payload: relate }) => {
      state.relate_price = relate;
    },
  },
});
export default relateSlice.reducer;
export const relateActions = relateSlice.actions;
