/**
 * @file AppContext.js
 * @description This file contains the implementation of a global React context
 * called AppContext. The context is used to manage and provide global state
 * related to user authentication throughout a React application. It provides
 * a context provider and a custom hook for consumption of the values across
 * components, facilitating state management in a clean and modular fashion.
 */

import React, { createContext, useState, useContext } from "react";

// Create the AppContext for managing global state
const AppContext = createContext();

/**
 * AppProvider component
 * @description This is a context provider component that wraps the app's
 * components to make user state accessible throughout the component tree.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The child components of this provider.
 * @returns {JSX.Element} A provider component with children wrapped.
 */
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Values to be shared across the app via context
  const value = {
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * useStorage hook
 * @description Custom hook to simplify the usage of AppContext within components.
 *
 * @returns {object} The context value containing user state and corresponding setter function.
 */
const useStorage = () => {
  return useContext(AppContext);
};

export { AppProvider, useStorage };
