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
  dummy: any[];
  imageList: { url: string }[];
  status: { error: string; message: string; loading: boolean };
};
const initialState: State = {
  items: [],
  input: {
    category: "회로물",
    name: "",
    descript: "",
    unit: "\\",
    price: 0,
    count: 0,
    use: true,
    supplyer: "",
    column: "",
  },
  dummy: [],
  imageList: [],
  status: { error: "", message: "", loading: false },
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
const statusSelector = (state: RootState) => {
  return state.item.status;
};
const dummySelector = (state: RootState) => {
  return state.item.dummy;
};
export const itemData = createSelector(
  inputSelector,
  imageListSelector,
  itemSelector,
  statusSelector,
  dummySelector,
  (input, imageList, items, status, dummy) => ({
    input,
    imageList,
    items,
    status,
    dummy,
  })
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    initForm: (state) => {
      state.items = initialState.items;
      state.input = initialState.input;
      state.imageList = initialState.imageList;
    },
    changeField: (state, { payload: { name, value } }) => {
      state.input[name] = value;
    },
    excelAdd: (state, action: PayloadAction<any[] | null>) => {
      state.status.error = "";
      state.status.message = "";
      state.status.loading = true;
    },
    excelAddSuccess: (state, { payload: items }) => {
      state.status.message = "";
      state.status.error = "";
      state.status.loading = false;
      state.items = state.items.concat(items);
    },
    excelAddFailure: (state, { payload: error }) => {
      state.status.message = "";
      state.status.error = error;
      state.status.loading = false;
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
    addItems: (state, { payload: items }) => {
      state.items = state.items.concat(items);
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
    filteredItems: (state, { payload: newItems }) => {
      state.items = newItems;
    },
    originItems: (state) => {
      state.items = state.dummy;
    },
  },
});
export default itemSlice.reducer;
export const itemActions = itemSlice.actions;
