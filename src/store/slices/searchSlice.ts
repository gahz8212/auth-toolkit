import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  [key: string]: {};
  all: {
    typeALL: boolean;
    groupALL: boolean;
  };
  type: {
    [key: string]: boolean;
    SET: boolean;
    ASSY: boolean;
    PARTS: boolean;
  };
  group: {
    [key: string]: boolean;
    회로: boolean;
    전장: boolean;
    기구: boolean;
    포장: boolean;
    기타: boolean;
  };
};
const initialState: State = {
  all: {
    typeALL: true,
    groupALL: true,
  },
  type: {
    SET: true,
    ASSY: true,
    PARTS: true,
  },
  group: {
    회로: true,
    전장: true,
    기구: true,
    포장: true,
    기타: true,
  },
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
    typeCheckAll: (state, { payload: value }) => {
      state.all.typeALL = value;
    },
    groupCheckAll: (state, { payload: value }) => {
      state.all.groupALL = value;
    },
    typeALL: (state, { payload: value }) => {
      console.log("value", value);
      state.all.typeALL = value;
      state.type.SET = value;
      state.type.ASSY = value;
      state.type.PARTS = value;
    },
    groupALL: (state, { payload: value }) => {
      state.all.groupALL = value;
      state.group.회로 = value;
      state.group.전장 = value;
      state.group.기구 = value;
      state.group.포장 = value;
      state.group.기타 = value;
    },
    checkType: (state, { payload: category }) => {
      state.type[category] = !state.type[category];
    },
    checkGroup: (state, { payload: category }) => {
      state.group[category] = !state.group[category];
    },
  },
});
export default searchSlice.reducer;
export const SearchActions = searchSlice.actions;
