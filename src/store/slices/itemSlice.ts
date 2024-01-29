import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  items: {
    id: number | "";
    category: string;
    name: string;
    descript: string;
    unit: string;
    price: number;
    count: number;
    use: boolean;
    supplyer: string;
    Images: { url: string }[];
    column: string;
  }[];
  input: {
    [key: string]: string | number | boolean;
    category: string;
    name: string;
    descript: string;
    unit: string;
    price: number;
    count: number;
    use: boolean;
    supplyer: string;
    column: string;
  };

  imageList: { url: string }[];
  status: { error: string; message: string };
};
const initialState: State = {
  items: [],
  input: {
    category: "회로물",
    name: "",
    descript: "",
    unit: "￦",
    price: 0,
    count: 0,
    use: true,
    supplyer: "",
    column: "",
  },

  imageList: [],
  status: { error: "", message: "" },
};
const inputSelector = (state: RootState) => {
  return state.item.input;
};
const imageListSelector = (state: RootState) => {
  return state.item.imageList;
};
const itemSelector = (state: RootState) => {
  return state.item.items;
};

export const itemData = createSelector(
  inputSelector,
  imageListSelector,
  itemSelector,

  (input, imageList, items) => ({ input, imageList, items })
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    initForm: (state) => {
      state.input = initialState.input;
      state.imageList = initialState.imageList;
    },
    changeField: (state, { payload: { name, value } }) => {
      state.input[name] = value;
    },

    addImage: (state, action: PayloadAction<FormData>) => {
      state.status.error = "";
      state.status.message = "";
    },
    addImageSuccess: (state, { payload: images }) => {
      state.imageList = state.imageList.concat(images);
    },
    addImageFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.message = "";
    },
    addItem: (
      state,
      action: PayloadAction<{
        category: string;
        name: string;
        descript: string;
        unit: string;
        price: number;
        count: number;
        use: boolean;
        supplyer: string;
        imageList: { url: string }[];
      }>
    ) => {
      state.status.error = "";
      state.status.message = "";
    },
    addItemSuccess: (state, { payload: item }) => {
      state.status.message = "";
      state.status.error = "";
      state.items = state.items.concat(item);
    },
    addItemFailure: (state, { payload: error }) => {
      state.status.message = "";
      state.status.error = error;
    },
    getItem: (state) => {
      state.status.error = "";
      state.status.message = "";
    },
    getItemSuccess: (state, { payload: items }) => {
      state.items = items;
      state.status.error = "";
      state.status.message = "";
    },
    getItemFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.message = "";
    },
    changeItems: (state, { payload: items }) => {
      state.items = items;
      state.status.error = "";
      state.status.message = "";

      // state.status.message = message;
    },
    
  },
});
export default itemSlice.reducer;
export const itemActions = itemSlice.actions;
