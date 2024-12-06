import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, call } from "redux-saga/effects";
import { authSaga } from "./sagas/authSaga";
import { userSaga } from "./sagas/userSaga";
import { itemSaga } from "./sagas/itemSaga";
import { editSaga } from "./sagas/editSaga";
import { excelSaga } from "./sagas/excelSaga";
import { orderSaga } from "./sagas/orderSaga";
import { currencySaga } from "./sagas/currencySaga";
import { chatSaga } from "./sagas/chatSaga";
import authSlice from "./slices/authSlice";
import { userActions } from "./slices/userSlice";
import itemSlice from "./slices/itemSlice";
import editSlice from "./slices/editSlice";
import formSlice from "./slices/formSlice";
import excelSlice from "./slices/excelSlice";
import searchSlice from "./slices/searchSlice";
import pageSlice from "./slices/pageSlice";
import orderSlice from "./slices/orderSlice";
import relateSlice from "./slices/relationSlice";
import currencySlice from "./slices/currencySlice";
import userSlice from "./slices/userSlice";
import chatSlice, { chatActions } from "./slices/chatSlice";
const reducers = combineReducers({
  auth: authSlice,
  user: userSlice,
  item: itemSlice,
  edit: editSlice,
  form: formSlice,
  excel: excelSlice,
  search: searchSlice,
  page: pageSlice,
  order: orderSlice,
  relate: relateSlice,
  currency: currencySlice,
  chat: chatSlice,
});
function* rootSaga() {
  yield all([
    call(authSaga),
    call(itemSaga),
    call(editSaga),
    call(excelSaga),
    call(orderSaga),
    call(currencySaga),
    call(userSaga),
    call(chatSaga),
  ]);
}
const sagaMiddleware = createSagaMiddleware();
const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;
    store.dispatch(userActions.check());
    store.dispatch(chatActions.getChats());
  } catch (e) {
    console.log("local storage is not working");
  }
};
const createStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);

  return store;
};
const store = createStore();
getUser();
export default store;
export type RootState = ReturnType<typeof store.getState>;
