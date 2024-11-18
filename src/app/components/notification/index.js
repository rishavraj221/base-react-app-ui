/**
 * Notification Component
 *
 * This component renders a material UI Snackbar notification with an Alert message,
 * allowing users to display notifications with varying severities (info, success, warning, error).
 * It supports automatic dismissal and manual closure by user interactions.
 *
 * Props:
 * - open (boolean): Controls the Snackbar visibility.
 * - message (string): The message to be displayed in the notification.
 * - severity (string: optional): Defines the alert style, defaults to "info". Accepts "success", "error", "warning", "info".
 * - onClose (function): A callback function that gets triggered on Snackbar close action.
 * - autoHideDuration (number: optional): Time in milliseconds after which the Snackbar will automatically hide. Defaults to 5000ms.
 */

import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Notification = ({
  open,
  message,
  severity = "info",
  onClose,
  autoHideDuration = 5000,
}) => {
  
  /**
   * Handles the closure of the Snackbar.
   *
   * @param {object} event - The event object that triggered the close action.
   * @param {string} reason - The reason for Snackbar closure, e.g., "timeout", "clickaway".
   */
  const handleClose = (event, reason) => {
    // Prevent closing the Snackbar when the reason is a clickaway.
    if (reason === "clickaway") return;

    // Calls the onClose function to let the parent component handle state updates.
    onClose(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
