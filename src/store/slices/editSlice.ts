import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  prev: {
    id: number;
    category: string;
    partsName: string;
    descript: string;
    unit: string;
    price: number;

    use: boolean;
    supplyer: string;

    Images: { url: string }[];
  };
  next: {
    [key: string]: string | number | boolean | { url: string }[];
    id: number;
    category: string;
    partsName: string;
    descript: string;
    unit: string;
    price: number;

    use: boolean;
    supplyer: string;

    Images: { url: string }[];
  };

  status: {
    error: string;
    loading: boolean;
    message: string;
  };
};

const initialState: State = {
  prev: {
    id: -1,
    category: "",
    partsName: "",
    descript: "",
    unit: "\\",
    price: 0,

    use: false,
    supplyer: "",

    Images: [],
  },
  next: {
    id: -1,
    category: "",
    partsName: "",
    descript: "",
    unit: "\\",
    price: 0,

    use: false,
    supplyer: "",

    Images: [],
  },

  status: { error: "", loading: false, message: "" },
};
const selectSelector = (state: RootState) => {
  return state.edit.prev;
};
const editSelector = (state: RootState) => {
  return state.edit.next;
};

const stateSelector = (state: RootState) => {
  return state.edit.status;
};

export const editData = createSelector(
  selectSelector,
  editSelector,
  stateSelector,

  (prev, next, status) => ({
    prev,
    next,
    status,
  })
);
const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    initForm: (state) => {
      state.prev = initialState.prev;
      state.next = initialState.next;
      state.status = initialState.status;
    },
    changeField: (state, { payload: { key, value } }) => {
      state.next[key] = value;
    },
    selectItem: (state, { payload: item }) => {
      state.prev = item;
      state.next = item;
    },
    editImage: (state, action: PayloadAction<FormData>) => {
      state.status.error = "";
      state.status.loading = true;
    },
    editImageSuccess: (state, { payload: images }) => {
      state.next.Images = state.next.Images.concat(images);
      state.status.loading = false;
      state.status.error = "";
    },
    editImageFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.loading = false;
    },
    editItem: (
      state,
      action: PayloadAction<{
        [key: string]: number | string | { url: string }[] | boolean;
      }>
    ) => {
      state.status.loading = true;
      state.status.error = "";
      state.status.message = "";
    },
    editItemSuccess: (state, { payload: message }) => {
      state.status.message = message;
      state.status.error = "";
    },
    editItemFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.message = "";
    },
    removeItem: (state, action: PayloadAction<number | "">) => {
      state.status.message = "";
      state.status.error = "";
    },
    removeItemSuccess: (state, { payload: message }) => {
      state.status.message = message;
      state.status.error = "";
    },
    removeItemFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.message = "";
    },
    removeImage: (state, { payload: image }) => {
      state.next.Images = image;
    },
  },
});
export default editSlice.reducer;
export const editActions = editSlice.actions;
