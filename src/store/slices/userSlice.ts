import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  auth: { id: number; name: string; rank: number } | null;
  status: { message: string; error: string; loading: boolean; expires: number };
};
const initialState: State = {
  auth: null,

  status: {
    message: "",
    error: "",
    loading: false,
    expires: Date.now(),
  },
};
const userSelector = (state: RootState) => {
  return state.user.auth;
};
const statusSelector = (state: RootState) => {
  return state.user.status;
};
export const userData = createSelector(
  userSelector,
  statusSelector,
  (auth, status) => ({ auth, status })
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    check: (state) => {
      state.auth = null;
      state.status.message = "";
      state.status.error = "";
      state.status.loading = true;
    },
    checkSuccess: (state, { payload: userInfo }) => {
      console.log(userInfo);
      state.auth = userInfo.auth;
      state.status.message = "check_ok";
      state.status.error = "";
      state.status.expires = userInfo.expires;
      state.status.loading = false;
    },
    checkFailure: (state, { payload: error }) => {
      state.auth = null;
      state.status.message = "check_ng";
      state.status.error = error;
      state.status.loading = false;
    },
    logout: (state) => {
      state.auth = null;
    },

    expires_init: (state) => {
      state.status.expires = Date.now();
    },
    extends_auth: (state) => {},
    extends_authSuccess: (state, { payload: expires }) => {
      state.status.expires = expires;
    },
    extends_authFailure: (state, { payload: error }) => {
      state.status.error = error;
    },
  },
});
export default userSlice.reducer;
export const userActions = userSlice.actions;
