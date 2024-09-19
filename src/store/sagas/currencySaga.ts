import { takeLatest, call, put } from "redux-saga/effects";
import * as currencyAPI from "../../lib/api/currencyAPI";
import { currencyActions } from "../slices/currencySlice";

function* searchCurrencySaga(action: { payload: { endPoint: string } }) {
  try {
    const response: { data: {} } = yield call(
      currencyAPI.currency,
      action.payload.endPoint
    );
    yield put(currencyActions.searchCurrencySuccess(response.data));
  } catch (e: any) {
    yield put(currencyActions.searchCurrencyFailure(e.response.data));
  }
}
export function* currencySaga() {
  yield takeLatest(currencyActions.searchCurrency, searchCurrencySaga);
}
