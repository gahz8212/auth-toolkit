import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { all, call } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { authSaga } from "./sagas/authSaga";
import { itemSaga } from "./sagas/itemSaga";
import { editSaga } from "./sagas/editSaga";
import { excelSaga } from "./sagas/excelSaga";
import authSlice from "./slices/authSlice";
import itemSlice from "./slices/itemSlice";
import editSlice from "./slices/editSlice";
import formSlice from "./slices/formSlice";
import excelSlice from "./slices/excelSlice";
import searchSlice from "./slices/searchSlice";
import pageSlice from "./slices/pageSlice";
import { authActions } from "./slices/authSlice";
const reducers = combineReducers({
  auth: authSlice,
  item: itemSlice,
  edit: editSlice,
  form: formSlice,
  excel: excelSlice,
  search: searchSlice,
  page: pageSlice,
});
function* rootSaga() {
  yield all([call(authSaga), call(itemSaga), call(editSaga), call(excelSaga)]);
}
const sagaMiddleware = createSagaMiddleware();
const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;
    store.dispatch(authActions.check());
  } catch (e) {
    console.log("local storage is not working");
  }
};
const createStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);

  return store;
};
const store = createStore();
getUser();
export default store;
export type RootState = ReturnType<typeof store.getState>;
