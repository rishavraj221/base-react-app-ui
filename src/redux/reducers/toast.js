import { createAction, createReducer } from "@reduxjs/toolkit";

const pushToast = createAction("pushToast");
const removeToast = createAction("removeToast");

const INITIAL_STATE = [];

const toastsReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(pushToast, (state, action) => {
      state.push({
        ...action.payload,
        open: true,
        toastId: Math.ceil(Math.random() * 100),
      });
    })
    .addCase(removeToast, (state, action) => {
      return state.filter((toast) => toast.toastId !== action.payload);
    });
});

export { pushToast, removeToast };
export default toastsReducer;
