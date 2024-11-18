/**
 * This file is responsible for configuring and creating the Redux store for the application. 
 * The store integrates Redux Toolkit for enhanced features such as easier state management 
 * and built-in support for middleware like error handling. 
 * 
 * It incorporates:
 * - Redux Toolkit's API slice for advanced asynchronous state management.
 * - Middleware that provides additional functionalities such as caching and error handling.
 * - Basic store setup with reducers for API operations and toast notifications.
 * 
 * Additionally, it sets up listeners to improve performance by enabling features such as refetching via polling.
 */

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { baseApi } from "./services/base-app";
import toastsReducer from "./reducers/toast";
import errorHandlingMiddleware from "./middlewares/error-handling";

// Configure and create the Redux store for managing global state
export const store = configureStore({
  // Define all reducers necessary for the application state
  reducer: {
    // Integrate baseApi to manage API requests and responses
    [baseApi.reducerPath]: baseApi.reducer,
    // Manage toast notifications
    toasts: toastsReducer,
  },
  // Apply middlewares including default middlewares and custom error handling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware, // Handles API request lifecycle with caching and polling
      errorHandlingMiddleware // Provides custom error management
    ),
});

// Setup listeners for dynamic features such as refetching data on focus
setupListeners(store.dispatch);
