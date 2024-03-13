import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  [key: string]: boolean;
  all: boolean;
  결합: boolean;
  회로: boolean;
  전장: boolean;
  기구: boolean;
  기타: boolean;
};
const initialState: State = {
  all: true,
  결합: true,
  회로: true,
  전장: true,
  기구: true,
  기타: true,
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
      state.결합 = value;
      state.회로 = value;
      state.전장 = value;
      state.기구 = value;
      state.기타 = value;
    },
    checkCategory: (state, { payload: category }) => {
      state[category] = !state[category];
    },
  },
});
export default searchSlice.reducer;
export const SearchActions = searchSlice.actions;
