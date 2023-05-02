import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ThemeType } from "theme";

export interface AppState {
  theme: ThemeType;
  heroImage: string;
}

const initialState: AppState = {
  theme: "light",
  heroImage: process.env.DEFAULT_HERO_IMAGE,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    setHeroImage: (state, action: PayloadAction<string>) => {
      state.heroImage = action.payload;
    },
  },
});

export const { setTheme, setHeroImage } = appSlice.actions;
