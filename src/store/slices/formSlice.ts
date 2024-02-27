import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  [key: string]: {
    visible: boolean;
    position: { x: number; y: number };
  };
  input: { visible: boolean; position: { x: number; y: number } };
  edit: { visible: boolean; position: { x: number; y: number } };
  invoice: { visible: boolean; position: { x: number; y: number } };
  packing: { visible: boolean; position: { x: number; y: number } };
};

const initialState: State = {
  input: { visible: false, position: { x: 100, y: 200 } },
  edit: { visible: false, position: { x: 100, y: 200 } },
  invoice: { visible: false, position: { x: 100, y: 200 } },
  packing: { visible: false, position: { x: 100, y: 200 } },
};
const inputFormSelector = (state: RootState) => {
  return state.form.input;
};
const editFormSelector = (state: RootState) => {
  return state.form.edit;
};
const invoiceFormSelector = (state: RootState) => {
  return state.form.invoice;
};
const packingFormSelector = (state: RootState) => {
  return state.form.packing;
};
export const formSelector = createSelector(
  inputFormSelector,
  editFormSelector,
  invoiceFormSelector,
  packingFormSelector,
  (input, edit, invoice, packing) => ({
    input,
    edit,
    invoice,
    packing,
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
