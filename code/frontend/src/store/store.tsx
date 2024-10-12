// store.tsx
// Configuration of the Redux store
// Created by Tash

import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import rootReducer from '../reducers/rootReducer'; // Import the root reducer

// Create the Redux store with the root reducer
const store = configureStore({
    reducer: rootReducer, // Assign the root reducer
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ 
            serializableCheck: false, // Customize middleware settings
            thunk: true, // Ensure thunk middleware is enabled for async actions
        }),
});

// Optional: Create a type for the Redux store's state
export type RootState = ReturnType<typeof store.getState>; // Type for the state
export type AppDispatch = typeof store.dispatch; // Type for the dispatch function

export default store; // Export the store for use in the application
