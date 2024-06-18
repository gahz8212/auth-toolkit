import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  prev: {
    id: number;
    type: string;
    groupType: string;
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
    Images: { url: string }[];
    Good: { groupName: string };
  };
  next: {
    [key: string]:
      | string
      | number
      | boolean
      | { groupName: string }
      | { url: string }[];
    id: number;
    type: string;
    groupType: string;
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
    Images: { url: string }[];
    Good: { groupName: string };
  };
  dragItem: {
    targetId: number;
    id: number;
    type: string;
    category: string;
    itemName: string;
    descript: string;
    unit: string;
    im_price: number;
    use: boolean;
    point: number;
  } | null;
  dragItems:
    | {
        [key: string]: string | number | boolean;
        targetId: number;
        id: number;
        type: string;
        category: string;
        itemName: string;
        descript: string;
        unit: string;
        im_price: number;
        use: boolean;
        point: number;
      }[];
  status: {
    error: string;
    loading: boolean;
    message: string;
  };
};

const initialState: State = {
  prev: {
    id: -1,
    type: "",
    groupType: "",
    category: "",
    itemName: "",
    descript: "",
    unit: "\\",
    im_price: 0,
    ex_price: 0,
    use: false,
    supplyer: "",
    weight: 0,
    cbm: 0,
    moq: 0,
    set: true,
    Images: [],
    Good: { groupName: "" },
  },
  next: {
    id: -1,
    type: "",
    groupType: "",
    category: "",
    itemName: "",
    descript: "",
    unit: "\\",
    im_price: 0,
    ex_price: 0,
    use: false,
    supplyer: "",
    weight: 0,
    cbm: 0,
    moq: 0,
    set: true,
    Images: [],
    Good: { groupName: "" },
  },
  dragItem: null,
  dragItems: [],
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
    changeField: (state, { payload: { name, value } }) => {
      // console.log(name, value);
      state.next[name] = value;
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
    addCount: (state, { payload: itemsId }) => {
      state.dragItems[itemsId.idx].point =
        state.dragItems[itemsId.idx].point + 1;
      state.next.im_price = state.dragItems.reduce(
        (prev, curr) => prev + curr.point * curr.im_price,
        0
      );
    },
    removeCount: (state, { payload: itemsId }) => {
      if (state.dragItems[itemsId.idx].point > 0) {
        state.dragItems[itemsId.idx].point =
          state.dragItems[itemsId.idx].point - 1;
        state.next.im_price = state.dragItems.reduce(
          (prev, curr) => prev + curr.point * curr.im_price,
          0
        );
      } else {
        state.dragItems.splice(itemsId.idx, 1);
      }
    },
  },
});
export default editSlice.reducer;
export const editActions = editSlice.actions;
