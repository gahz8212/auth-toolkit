import { call, put, take, takeLatest } from "redux-saga/effects";
import { OrderAction } from "../slices/orderSlice";
import * as orderAPI from "../../lib/api/orderAPI";
function* getDummyItemSaga() {
  try {
    const response: { data: any[] } = yield call(orderAPI.getDummyItem);
    yield put(OrderAction.getDummyItemSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(OrderAction.getDummyItemFailure(e.response.data));
  }
}
function* getOrderDataSaga() {
  try {
    const response: { data: any[] } = yield call(orderAPI.getOrderData);

    yield put(OrderAction.getOrderDataSuccess(response.data));
    yield put(OrderAction.inputOrderSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(OrderAction.getOrderDataFailure(e.response.data));
  }
}
function* inputOrderSaga(action: { payload: any[] | null }) {
  try {
    const response: { data: any[] } = yield call(
      orderAPI.orderInput,
      action.payload
    );
    yield put(OrderAction.inputOrderSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(OrderAction.inputOrderFailure(e.response.data));
  }
}
function* inputGoodSaga(action: { payload: any[] | null }) {
  try {
    const response: { data: string } = yield call(
      orderAPI.goodInput,
      action.payload
    );

    yield put(OrderAction.inputGoodSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(OrderAction.inputGoodFailure(e.response.data));
  }
}
function* inputPalletSaga(action: {
  payload: { [key: string]: { [key: string]: string | number }[] };
}) {
  try {
    const response: { data: any[] } = yield call(
      orderAPI.palletInput,
      action.payload
    );
    yield put(OrderAction.inputPalletSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(OrderAction.inputPalletFailure(e.response.data));
  }
}
export function* orderSaga() {
  yield takeLatest(OrderAction.inputOrder, inputOrderSaga);
  yield takeLatest(OrderAction.inputGood, inputGoodSaga);
  yield takeLatest(OrderAction.getOrderData, getOrderDataSaga);
  yield takeLatest(OrderAction.getDummyItem, getDummyItemSaga);
  yield takeLatest(OrderAction.inputPallet, inputPalletSaga);
}
