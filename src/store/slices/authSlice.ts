import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../";
type State = {
  [key: string]: { [key: string]: string | number | boolean };
  login: { email: string; password: string };
  join: { email: string; password: string; name: string; rank: number };
  status: {
    message: string;
    error: string;
    loading: boolean;
  };
};

const initialState: State = {
  login: { email: "", password: "" },
  join: { email: "", name: "", password: "", rank: 0 },
  status: { message: "", error: "", loading: false },
};
const errorSelector = (state: RootState) => {
  return state.auth.status.error;
};
const messageSelector = (state: RootState) => {
  return state.auth.status.message;
};

const loginSelector = (state: RootState) => {
  return state.auth.login;
};
const joinSelector = (state: RootState) => {
  return state.auth.join;
};
export const authData = createSelector(
  errorSelector,
  messageSelector,
  loginSelector,
  joinSelector,
  (error, message, loginData, joinData) => ({
    error,
    message,
    loginData,
    joinData,
  })
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initForm: (state, { payload: form }) => {
      state[form] = initialState[form];
      state.status.message = initialState.status.message;
      state.status.error = initialState.status.error;
    },
    errorReset: (state) => {
      state.status.error = "";
    },
    changeField: (state, { payload: { form, key, value } }) => {
      state[form][key] = value;
    },
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.status.error = "";
      state.status.message = "";
    },
    loginSuccess: (state, { payload: message }) => {
      state.status.message = message;
      state.status.error = "";
    },
    loginFailure: (state, { payload: error }) => {
      state.status.message = "";
      state.status.error = error;
    },
    join: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        name: string;
        rank: number;
      }>
    ) => {
      state.status.message = "";
      state.status.error = "";
    },
    joinSuccess: (state, { payload: message }) => {
      state.status.message = message;
      state.status.error = "";
    },
    joinFailure: (state, { payload: error }) => {
      state.status.message = "";
      state.status.error = error;
    },
  },
});
export default authSlice.reducer;
export const authActions = authSlice.actions;
