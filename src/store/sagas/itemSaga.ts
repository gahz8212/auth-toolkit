import { call, put, takeLatest } from "redux-saga/effects";
import * as itemAPI from "../../lib/api/itemAPI";
import { itemActions } from "../slices/itemSlice";
function* addImageSaga(action: { payload: FormData }) {
  try {
    const response: { data: { url: string }[] } = yield call(
      itemAPI.addImage,
      action.payload
    );
    yield put(itemActions.addImageSuccess(response.data));
  } catch (e: any) {
    yield put(itemActions.addImageFailure(e.response.data));
  }
}
function* addItemSaga(action: {
  payload: {
    category: string;
    name: string;
    descript: string;
    unit: string;
    price: number;
    count: number;
    use: boolean;
    supplyer: string;
    imageList: { url: string }[];
  };
}) {
  try {
    const response: {
      data: {
        category: string;
        name: string;
        descript: string;
        unit: string;
        price: number;
        count: number;
        use: boolean;
        supplyer: string;
        column: string;
        imageList: { url: string }[];
      };
    } = yield call(itemAPI.addItem, action.payload);
    yield put(itemActions.addItemSuccess(response.data));
  } catch (e: any) {
    yield put(itemActions.addItemFailure(e.response.data));
  }
}
function* getItemSaga() {
  try {
    const response: {
      data: {
        category: string;
        name: string;
        descript: string;
        unit: string;
        price: number;
        count: number;
        use: boolean;
        supplyer: string;
        column: string;
        imageList: { url: string }[];
      }[];
    } = yield call(itemAPI.getItem);
    yield put(itemActions.getItemSuccess(response.data));
  } catch (e: any) {
    yield put(itemActions.getItemFailure(e.response.data));
  }
}
export function* itemSaga() {
  yield takeLatest(itemActions.addImage, addImageSaga);
  yield takeLatest(itemActions.addItem, addItemSaga);
  yield takeLatest(itemActions.getItem, getItemSaga);
}
