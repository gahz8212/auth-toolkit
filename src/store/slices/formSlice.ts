import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  [key: string]: {
    visible: boolean;
    position: { x: number; y: number };
  };
  input: { visible: boolean; position: { x: number; y: number } };
  edit: { visible: boolean; position: { x: number; y: number } };
  search: { visible: boolean; position: { x: number; y: number } };
};

const initialState: State = {
  input: { visible: false, position: { x: 100, y: 150 } },
  edit: { visible: false, position: { x: 100, y: 150 } },
  search: { visible: false, position: { x: 0, y: 0 } },
};
const inputFormSelector = (state: RootState) => {
  return state.form.input;
};
const editFormSelector = (state: RootState) => {
  return state.form.edit;
};
const searchFormSelector = (state: RootState) => {
  return state.form.search;
};

export const formSelector = createSelector(
  inputFormSelector,
  editFormSelector,
  searchFormSelector,
  // positionSelector,
  (input, edit, search) => ({
    input,
    edit,
    search,
  })
);
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    toggle_form: (state, { payload: { form, value } }) => {
      state[form].visible = value;
    },
    changePosition: (state, { payload: { form, position } }) => {
      state[form].position = position;
    },
    initPosition: (state, { payload: form }) => {
      state[form].position.x = initialState[form].position.x;
      state[form].position.y = initialState[form].position.y;
    },
  },
});
export default formSlice.reducer;
export const formActions = formSlice.actions;
