// rootReducer.tsx
// Root reducer for managing combined state in Redux
// Created by Tash

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer'; // Import the new chat reducer

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer, // Add chat reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
