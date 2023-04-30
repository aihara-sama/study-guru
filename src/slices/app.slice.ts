import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ThemeType } from "theme";

export interface AppState {
  theme: ThemeType;
}

const initialState: AppState = {
  theme: "light",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;
