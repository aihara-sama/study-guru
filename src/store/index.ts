import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Store as ReduxStore } from "redux";
import { persistStore } from "redux-persist";
import { appSlice } from "slices/app.slice";
import { userSlice } from "slices/user.slice";

export const store = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    user: userSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredActionPaths: ["register"],
        ignoredPaths: ["register"],
      },
    }),
});

export type ApplicationState = {
  app: ReturnType<typeof appSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = ReduxStore<ApplicationState>;

export const persistor = persistStore(store);
