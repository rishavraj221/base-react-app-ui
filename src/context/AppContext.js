import React, { createContext, useState } from "react";

// Create the AppContext
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Values to be shared across the app
  const value = {
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
const useStorage = () => {
  return React.useContext(AppContext);
};

export { AppProvider, useStorage };
