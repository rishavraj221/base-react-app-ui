/**
 * @file
 * This file contains a Redux middleware function for handling errors within the action lifecycle.
 * The middleware intercepts actions that contain an error and relevant metadata, especially focusing
 * on HTTP status codes that indicate an error (400 and above). When such an error is detected, the middleware
 * dispatches a toast notification action to alert the user with the error message, enhancing user experience
 * by providing immediate feedback on issues.
 */

import { pushToast } from "../reducers/toast";

/**
 * Error handling middleware for Redux to manage and dispatch error notifications.
 * 
 * @param {Function} dispatch - The Redux store's dispatch function.
 * @returns {Function} A function that takes the next middleware to be called.
 * 
 * The middleware checks if the action has an error and metadata with a baseQueryMeta, 
 * indicating it is a network-based action. If an HTTP error status is detected (400 and above),
 * it dispatches a toast notification with a severity of "error" containing the error message.
 */
const errorHandlingMiddleware = ({ dispatch }) => (next) => (action) => {
  // Check if action contains an error and necessary metadata.
  if (action.error && action.meta && action.meta.baseQueryMeta) {
    const status = action.meta.baseQueryMeta.response.status;

    // If the status indicates an error, dispatch a toast notification
    if (status >= 400) {
      dispatch(
        pushToast({
          message: 
            action.payload?.data?.error || // Message from the server response
            action.error?.message ||      // General error message
            action.payload?.message ||    // Payload specific message
            "Something went wrong!",      // Default fallback message
          severity: "error",
        })
      );
    }
  }

  // Continue to the next middleware or the reducer
  return next(action);
};

export default errorHandlingMiddleware;
