import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  [key: string]: boolean;
  all: boolean;
  circuit: boolean;
  electric: boolean;
  mechanical: boolean;
  etc: boolean;
};
const initialState: State = {
  all: true,
  circuit: true,
  electric: true,
  mechanical: true,
  etc: true,
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
      state.circuit = value;
      state.electric = value;
      state.mechanical = value;
      state.etc = value;
    },
    checkCategory: (state, { payload: category }) => {
      state[category] = !state[category];
    },
  },
});
export default searchSlice.reducer;
export const SearchActions = searchSlice.actions;
