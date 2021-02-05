import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});

export type RootState = ReturnType<typeof rootReducer>;
