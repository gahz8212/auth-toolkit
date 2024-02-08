import { call, put, takeLatest } from "redux-saga/effects";
import { OrderAction } from "../slices/orderSlice";
import * as orderAPI from "../../lib/api/orderAPI";
function* inputOrderSaga(action: { payload: any[] | null }) {
  try {
    const response: { data: string } = yield call(
      orderAPI.orderInput,
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
}
