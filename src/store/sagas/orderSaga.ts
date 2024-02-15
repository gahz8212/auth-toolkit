import { call, put, takeLatest } from "redux-saga/effects";
import { OrderAction } from "../slices/orderSlice";
import * as orderAPI from "../../lib/api/orderAPI";
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
    yield put(OrderAction.inputOrderSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(OrderAction.inputOrderFailure(e.response.data));
  }
}
export function* orderSaga() {
  yield takeLatest(OrderAction.inputOrder, inputOrderSaga);
  yield takeLatest(OrderAction.inputGood, inputGoodSaga);
}
