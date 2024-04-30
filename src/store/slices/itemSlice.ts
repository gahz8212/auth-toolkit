import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  items: {
    id: number;
    type: string;
    groupType: string;
    groupName: string;
    category: string;
    itemName: string;
    descript: string;
    unit: string;
    im_price: number;
    ex_price: number;
    use: boolean;
    supplyer: string;
    weight: number;
    cbm: number;
    moq: number;
    set: boolean;

    // Images: { url: string }[];
  }[];
  input: {
    [key: string]: string | number | boolean;
    type: string;
    groupType: string;
    groupName: string;
    category: string;
    itemName: string;
    descript: string;
    unit: string;
    im_price: number;
    ex_price: number;
    use: boolean;
    supplyer: string;
    weight: number;
    cbm: number;
    moq: number;
    set: boolean;
  };
  backup: any[];
  imageList: { url: string }[];
  itemImageList: { ItemId: number; GoodName: string; url: string }[];
  status: { error: string; message: string; loading: boolean };
};
const initialState: State = {
  items: [],
  input: {
    type: "PARTS",
    groupType: "",
    groupName: "",
    category: "",
    itemName: "",
    descript: "",
    unit: "$",
    im_price: 0,
    ex_price: 0,
    use: true,
    supplyer: "",
    weight: 0,
    cbm: 0,
    moq: 0,
    set: true,
  },
  backup: [],
  imageList: [],
  itemImageList: [],
  status: { error: "", message: "", loading: false },
};
const inputSelector = (state: RootState) => {
  return state.item.input;
};
const imageListSelector = (state: RootState) => {
  return state.item.imageList;
};
const itemImageListSelector = (state: RootState) => {
  return state.item.itemImageList;
};
const itemSelector = (state: RootState) => {
  return state.item.items;
};
const statusSelector = (state: RootState) => {
  return state.item.status;
};
const dummySelector = (state: RootState) => {
  return state.item.backup;
};
export const itemData = createSelector(
  inputSelector,
  imageListSelector,
  itemImageListSelector,
  itemSelector,
  statusSelector,
  dummySelector,
  (input, imageList, itemImageList, items, status, backup) => ({
    input,
    imageList,
    itemImageList,
    items,
    status,
    backup,
  })
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    initForm: (state) => {
      // state.items = initialState.items;
      state.input = initialState.input;
      state.imageList = initialState.imageList;
    },
    changeField: (state, { payload: { name, value } }) => {
      state.input[name] = value;
    },
    changeInitial: (state, { payload: { value } }) => {
      // console.log(value);
      if (value === "SET") {
        state.input.category = "EDT";
        state.input.supplyer = "자체";
      } else if (value === "ASSY") {
        state.input.category = "회로";
      } else {
        state.input.category = "회로";
      }
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
      state.backup = state.items;
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
        type: string;
        groupType: string;
        groupName: string;
        category: string;
        itemName: string;
        descript: string;
        unit: string;
        im_price: number;
        ex_price: number;
        use: boolean;
        supplyer: string;
        weight: number;
        cbm: number;
        moq: number;
        set: boolean;
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
      state.backup = state.items;
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
      state.items = items[0];
      state.itemImageList = items[1];
      state.status.error = "";
      state.status.message = "";
      state.backup = state.items;
    },
    getItemFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.message = "";
    },
    changeItems: (state, { payload: items }) => {
      state.items = items;
      state.status.error = "";
      state.status.message = "";
      state.backup = state.items;

      // state.status.message = message;
    },
    filteredItems: (state, { payload: newItems }) => {
      state.items = newItems;
    },
    backupItems: (state) => {
      state.items = state.backup;
    },
  },
});
export default itemSlice.reducer;
export const itemActions = itemSlice.actions;
