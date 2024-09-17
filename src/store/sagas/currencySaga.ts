import { takeLatest, call, put } from "redux-saga/effects";
import * as currencyAPI from "../../lib/api/currency";
// import {currencyActions}
function * currencySaga(){
    const response:{data:[]}=yield call(currencyAPI.currency);
   
}