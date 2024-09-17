import { takeLatest, call, put } from "redux-saga/effects";
import * as currencyAPI from "../../lib/api/currency";
import { currencyActions } from "../slices/currencySlice";

function* changeCurrencySaga(action: {
  payload: { toCurrency: string; fromCurrency: string };
}) {
  try {
    const response: { data: [] } = yield call(
      currencyAPI.currency,
      action.payload
    );
    yield put(currencyActions.changeCurrencySuccess(response.data));
  } catch (e: any) {
    yield put(currencyActions.changeCurrencyFailure(e.response.data));
  }
}
export function* currencySaga() {
  yield takeLatest(currencyActions.changeCurrency, changeCurrencySaga);
}
