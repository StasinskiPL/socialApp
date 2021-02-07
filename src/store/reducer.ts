import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { userSlice } from "./userSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});

export type RootState = ReturnType<typeof rootReducer>;
