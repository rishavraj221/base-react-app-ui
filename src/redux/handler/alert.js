import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Notification from "@/app/components/notification";
import { removeToast } from "../reducers/toast";

const AlertHandler = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toasts);

  const handleToastDismiss = (toastId) => {
    dispatch(removeToast(toastId));
  };

  return (
    <>
      {toasts?.length > 0 &&
        toasts.map(({ toastId, open, message, severity }) => (
          <Notification
            key={toastId}
            open={open}
            message={message}
            severity={severity}
            onClose={() => handleToastDismiss(toastId)}
          />
        ))}
    </>
  );
};

export default AlertHandler;
