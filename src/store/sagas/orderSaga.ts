import { call, put, takeLatest } from "redux-saga/effects";
import { OrderAction } from "../slices/orderSlice";
import * as orderAPI from "../../lib/api/orderAPI";
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
export function* orderSaga() {
  yield takeLatest(OrderAction.inputOrder, inputOrderSaga);
  yield takeLatest(OrderAction.inputGood, inputGoodSaga);
  yield takeLatest(OrderAction.getOrderData, getOrderDataSaga);
}
