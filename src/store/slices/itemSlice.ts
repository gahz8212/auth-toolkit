import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  items:
    | {
        id: number;
        type: string;
        groupType: string;
        category: string;
        itemName: string;
        descript: string;
        unit: string;
        im_price: number;
        sum_im_price: number;
        ex_price: number;
        use: boolean;
        supplyer: string;
        weight: number;
        cbm: number;
        moq: number;
        set: boolean;
        Images: { url: string }[];
        Good: { groupName: string };
        left: number;
        top: number;
        point: number;
        // visible: boolean;
      }[]
    | null;
  change:
    | {
        id: number;
        type: string;
        groupType: string;
        category: string;
        itemName: string;
        descript: string;
        unit: string;
        im_price: number;
        sum_im_price: number;
        ex_price: number;
        use: boolean;
        supplyer: string;
        weight: number;
        cbm: number;
        moq: number;
        set: boolean;
        Images: { url: string }[];
        Good: { groupName: string };
        left: number;
        top: number;
        point: number;
        // visible: boolean;
      }[]
    | null;
  relations:
    | {
        UpperId: number;
        LowerId: number;
        point: number;
      }[]
    | null;
  input: {
    [key: string]: string | number | boolean | {}[];
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
    dragItems: {}[];
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
    sum_im_price: number;
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
        sum_im_price: number;
        use: boolean;
        point: number;
      }[];
  T_dragItems:
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
        sum_im_price: number;
        use: boolean;
        point: number;
      }[];
  backup:
    | {
        id: number;
        type: string;
        groupType: string;
        category: string;
        itemName: string;
        descript: string;
        unit: string;
        im_price: number;
        sum_im_price: number;
        ex_price: number;
        use: boolean;
        supplyer: string;
        weight: number;
        cbm: number;
        moq: number;
        set: boolean;
        Images: { url: string }[];
        Good: { groupName: string };
        left: number;
        top: number;
        point: number;
        // visible: boolean;
      }[]
    | null;
  imageList: { url: string }[];
  repairs:
    | {
        id: number;
        itemName: string;
        unit: string;
        im_price: number;
        ex_price: number;
        quantity: number;
        CT_qty: number;
        weight: number;
        cbm: number;
      }[]
    | null;

  status: { error: string; message: string; loading: boolean };
};
const initialState: State = {
  items: null,
  change: null,
  relations: null,
  input: {
    type: "PARTS",
    groupType: "",
    groupName: "",
    category: "회로",
    itemName: "",
    descript: "",
    unit: "\\",
    im_price: 0,
    ex_price: 0,
    use: true,
    supplyer: "",
    weight: 0,
    cbm: 0,
    moq: 0,
    set: true,
    dragItems: [],
    visible: false,
  },
  dragItem: null,
  dragItems: [],
  T_dragItems: [],
  backup: null,
  imageList: [],
  repairs: [
    {
      id: 0,
      itemName: "reapair1",
      unit: "\\",
      im_price: 1000,
      ex_price: 1,
      quantity: 10,
      CT_qty: 1,
      weight: 0,
      cbm: 0,
    },
    {
      id: 1,
      itemName: "reapair2",
      unit: "\\",
      im_price: 900,
      ex_price: 1,
      quantity: 20,
      CT_qty: 0,
      weight: 0,
      cbm: 0,
    },
  ],
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
const backupSelector = (state: RootState) => {
  return state.item.backup;
};
const dragItemSelector = (state: RootState) => {
  return state.item.dragItem;
};
const dragItemsSelector = (state: RootState) => {
  return state.item.dragItems;
};
const TdragItemsSelector = (state: RootState) => {
  return state.item.T_dragItems;
};
const relationSelector = (state: RootState) => {
  return state.item.relations;
};
const repairsSelector = (state: RootState) => {
  return state.item.repairs;
};

export const itemData = createSelector(
  inputSelector,
  imageListSelector,
  itemSelector,
  statusSelector,
  backupSelector,
  dragItemSelector,
  dragItemsSelector,
  TdragItemsSelector,
  relationSelector,
  repairsSelector,

  (
    input,
    imageList,
    items,
    status,
    backup,
    dragItem,
    dragItems,
    T_dragItems,
    relations,
    repairs
  ) => ({
    input,
    imageList,
    items,
    status,
    backup,
    dragItem,
    dragItems,
    T_dragItems,
    relations,
    repairs,
  })
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    initForm: (state) => {
      state.input = initialState.input;
      state.imageList = initialState.imageList;
      state.dragItems = [];
      state.T_dragItems = [];

      // state.relations = null;
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
      if (state.items) {
        state.items = state.items.concat(items);
      }
      // state.backup = state.items;
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
        dragItems: {}[];
      }>
    ) => {
      state.status.error = "";
      state.status.message = "";
    },
    addItemSuccess: (state, { payload: items }) => {
      // console.log("items", items);
      state.status.message = "";
      state.status.error = "";
      if (state.items) {
        state.items = [...state.items, items[0]];
        if (state.relations) {
          state.relations = [...state.relations, ...items[1]];
        }
        // state.backup = state.items;
      }
    },
    addItemFailure: (state, { payload: error }) => {
      state.status.message = "";
      state.status.error = error;
    },
    addItems: (state, { payload: items }) => {
      if (state.items) {
        state.items = [...state.items, items];
      }
    },
    getItem: (state) => {
      state.status.error = "";
      state.status.message = "";
    },
    getItemSuccess: (state, { payload: items }) => {
      state.items = items[0];
      state.status.error = "";
      state.status.message = "";
      state.relations = items[1];
      // state.backup = state.items;
    },
    getItemFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.message = "";
    },
    changeItems: (state, { payload: items }) => {
      state.items = items;
      state.status.error = "";
      state.status.message = "";
      // state.backup = state.items;
    },
    changeBItems: (state, { payload: items }) => {
      state.backup = items;
      state.status.error = "";
      state.status.message = "";
      // state.backup = state.items;
    },
    filteredItems: (state, { payload: newItems }) => {
      state.backup = state.items;
      state.items = newItems;
    },

    viewMatrix: (state, { payload: items }) => {
      // console.log(items);
      state.backup = state.items;
      state.items = items;
    },
    backupItems: (state) => {
      state.items = state.backup;
    },
    inputDragItem: (state, { payload: item }) => {
      state.dragItem = item;
    },
    inputDragItems: (state, { payload: items }) => {
      state.dragItems = items;
    },
    drag_on: (state, { payload: targetId }) => {
      if (state.dragItem) {
        state.dragItem.targetId = targetId;
        state.dragItems = [...state.dragItems, state.dragItem];
        state.dragItem = null;
      }
    },
    Tdrag_on: (state) => {
      if (state.dragItem) {
        state.T_dragItems = [...state.T_dragItems, state.dragItem];
        state.dragItem = null;
      }
    },
    initialDragItem: (state) => {
      state.dragItem = null;
    },
    // addCount: (state, { payload: itemsId }) => {
    //   state.dragItems[itemsId.idx].point =
    //     state.dragItems[itemsId.idx].point + 1;
    //   if (state.items) {
    //     state.items[itemsId.targetId - 1].sum_im_price = state.dragItems.reduce(
    //       (prev, curr) =>
    //         prev + curr.point * curr.im_price + curr.point * curr.sum_im_price,
    //       0
    //     );
    //   }
    // },
    addCount: (state, { payload: itemsId }) => {
      state.dragItems[itemsId.idx].point =
        state.dragItems[itemsId.idx].point + 1;

      state.dragItems[itemsId.idx].sum_im_price =
        state.dragItems[itemsId.idx].point *
        state.dragItems[itemsId.idx].im_price;
    },
    addCount_relate: (state, { payload: itemsId }) => {
      if (state.items) {
        state.items[itemsId].point = state.items[itemsId].point + 1;
      }
    },
    removeCount: (state, { payload: itemsId }) => {
      if (state.dragItems && state.dragItems[itemsId.idx].point > 0) {
        state.dragItems[itemsId.idx].point =
          state.dragItems[itemsId.idx].point - 1;
        state.dragItems[itemsId.idx].sum_im_price =
          state.dragItems[itemsId.idx].point *
          state.dragItems[itemsId.idx].im_price;
      } else if (state.dragItems && state.dragItems[itemsId.idx].point === 0) {
        alert("제거할 수 없습니다.");
      } else {
        if (state.dragItems) {
          state.dragItems.splice(itemsId.idx, 1);
        }
      }
    },
    removeCount_relate: (state, { payload: itemsId }) => {
      if (state.items) {
        if (state.items && state.items[itemsId].point > 0) {
          state.items[itemsId].point = state.items[itemsId].point - 1;
          // state.items[itemsId].sum_im_price =
          //   state.items[itemsId].point *
          //   state.items[itemsId].im_price;
        } else {
          // state.items.splice(itemsId, 1);
        }
      }
    },
    T_addCount: (state, { payload: idx }) => {
      state.T_dragItems[idx].point = state.T_dragItems[idx].point + 1;
      state.T_dragItems[idx].sum_im_price =
        state.T_dragItems[idx].point * state.T_dragItems[idx].im_price;
    },
    T_removeCount: (state, { payload: idx }) => {
      if (state.T_dragItems[idx].point > 0) {
        state.T_dragItems[idx].point = state.T_dragItems[idx].point - 1;
        state.T_dragItems[idx].sum_im_price =
          state.T_dragItems[idx].point * state.T_dragItems[idx].im_price;
      } else {
        state.T_dragItems.splice(idx, 1);
      }
    },
    updateRelation: (state, { payload: newRelations }) => {
      // console.log("newRelations", newRelations);
      state.relations = newRelations;
    },
    addRepairs: (state, { payload: newRepairs }) => {
      const repairs = state.repairs?.map((repare) => repare.itemName);
      if (!repairs?.includes(newRepairs.itemName)) {
        state.repairs?.unshift(newRepairs);
      }
    },
    removeRepairs: (state, { payload: id }) => {
      const idx = state.repairs?.filter((repair) => repair.id === id);
    },
  },
});
export default itemSlice.reducer;
export const itemActions = itemSlice.actions;
