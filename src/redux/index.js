/**
 * @file index.js
 * 
 * This file serves as the entry point for exporting the Redux store, which is the central piece of state management in a React application.
 * The store is created in a separate file and imported here for simpler and more organized access in other parts of the application.
 * 
 * Exporting the store allows components and middleware to dispatch actions and subscribe to state updates.
 * Ensure that the store is correctly configured with any middleware like thunk or saga for side effects management if required.
 */

// Import the Redux store from another module
import { store } from "./store";

// Export the store to make it available throughout the app
export default store;
