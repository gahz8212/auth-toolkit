import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  [key: string]: boolean;
  all: boolean;
  회로물: boolean;
  전장물: boolean;
  기구물: boolean;
  기타물: boolean;
};
const initialState: State = {
  all: true,
  회로물: true,
  전장물: true,
  기구물: true,
  기타물: true,
};
const searchSelector = (state: RootState) => {
  return state.search;
};
export const SearchCondition = createSelector(searchSelector, (search) => ({
  search,
}));
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    initState: (state) => {
      state = initialState;
    },
    onlyCheckAll: (state, { payload: value }) => {
      state.all = value;
    },
    checkAll: (state, { payload: value }) => {
      state.all = value;
      state.회로물 = value;
      state.전장물 = value;
      state.기구물 = value;
      state.기타물 = value;
    },
    checkCategory: (state, { payload: category }) => {
      state[category] = !state[category];
    },
  },
});
export default searchSlice.reducer;
export const SearchActions = searchSlice.actions;
