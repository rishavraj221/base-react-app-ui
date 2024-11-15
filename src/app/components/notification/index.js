import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Notification = ({
  open,
  message,
  severity = "info",
  onClose,
  autoHideDuration = 5000,
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    onClose(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
