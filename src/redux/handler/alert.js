/**
 * AlertHandler Component
 * 
 * This React component is responsible for rendering a list of notification toasts.
 * These toasts are retrieved from the Redux store and displayed using the Notification component.
 * The component handles the dismissal of each toast by dispatching an action to remove it from the store.
 * 
 * - Dependencies:
 *   - Redux: Used to access global state and dispatch actions.
 *   - Notification: A component to display individual notifications.
 * 
 * - State Management:
 *   - Uses `useSelector` to select `toasts` from the Redux store.
 *   - Uses `useDispatch` to get the `dispatch` function for dispatching Redux actions.
 * 
 * - Notifications:
 *   - Each toast has an ID, open state, message, and severity level.
 *   - Toasts are mapped to Notification components, which are displayed if the toast is open.
 *   - The onClose property of Notification is used to handle toast dismissal.
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Notification from "@/app/components/notification";
import { removeToast } from "../reducers/toast";

const AlertHandler = () => {
  // Access the Redux dispatch function
  const dispatch = useDispatch();

  // Select the list of toasts from the Redux store
  const toasts = useSelector((state) => state.toasts);

  /**
   * handleToastDismiss
   * 
   * Dispatches an action to remove a toast from the Redux store.
   * 
   * @param {string} toastId - The unique identifier of the toast to be removed.
   */
  const handleToastDismiss = (toastId) => {
    dispatch(removeToast(toastId));
  };

  return (
    <>
      {toasts?.length > 0 &&
        toasts.map(({ toastId, open, message, severity }) => (
          // Render each Notification component with the relevant data
          <Notification
            key={toastId} // Unique key for each toast
            open={open} // Determines if the notification is visible
            message={message} // The message displayed in the notification
            severity={severity} // The severity level of the notification
            onClose={() => handleToastDismiss(toastId)} // Handle notification close
          />
        ))
      }
    </>
  );
};

export default AlertHandler;
