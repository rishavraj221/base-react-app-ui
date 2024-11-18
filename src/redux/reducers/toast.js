/**
 * This file defines the Redux slice of state dedicated to managing toast notifications.
 * This slice includes actions for adding and removing toasts as well as a reducer
 * to handle these actions, maintaining an array of toast objects.
 */

import { createAction, createReducer } from "@reduxjs/toolkit";

// Action to add a toast notification to the state
const pushToast = createAction("pushToast");

// Action to remove a toast notification from the state by toast ID
const removeToast = createAction("removeToast");

// Initial state set as an empty array to store the toast notifications
const INITIAL_STATE = [];

// Reducer to handle the toast state, defining behavior for each action
const toastsReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(pushToast, (state, action) => {
      const toastId = Math.ceil(Math.random() * 100);
      
      // Creating a new toast with a unique ID and adding it to the state
      state.push({
        ...action.payload,
        open: true,
        toastId,
      });
    })
    .addCase(removeToast, (state, action) => {
      // Filtering out the toast that matches the provided ID
      return state.filter((toast) => toast.toastId !== action.payload);
    });
});

// Exporting the actions and the reducer for use in the application
export { pushToast, removeToast };
export default toastsReducer;
