import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import type { Store as ReduxStore } from "redux";

import { notesApi } from "services/notes";
import { reviewsApi } from "services/reviews";
import { appSlice } from "slices/app.slice";
import { userSlice } from "slices/user.slice";

export const store = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    user: userSlice.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...[notesApi.middleware, reviewsApi.middleware]
    ),
});

setupListeners(store.dispatch);

export type ApplicationState = {
  app: ReturnType<typeof appSlice.reducer>;
  user: ReturnType<typeof userSlice.reducer>;
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = ReduxStore<ApplicationState>;
