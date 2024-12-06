import { put, call, takeLatest } from "redux-saga/effects";
import * as chatAPI from "../../lib/api/chat/chatAPI";
import { chatActions } from "../slices/chatSlice";

function* addImageSaga(action: { payload: FormData }) {
  try {
    const response: { data: string } = yield call(
      chatAPI.addImage,
      action.payload
    );
    yield put(chatActions.addImageSuccess(response.data));
  } catch (e: any) {
    yield put(chatActions.addImageFailure(e.response.data));
  }
}
function* getChatsSaga() {
  try {
    const response: {
      data: { chat: string; name: string; image: string }[];
    } = yield call(chatAPI.getChats);
    yield put(chatActions.getChatsSuccess(response.data));
    // console.log("saga:messages", response.data);
  } catch (e: any) {
    yield put(chatActions.getChatsFailure(e.response.data));
    console.error(e);
  }
}
export function* chatSaga() {
  yield takeLatest(chatActions.addImage, addImageSaga);
  yield takeLatest(chatActions.getChats, getChatsSaga);
}
