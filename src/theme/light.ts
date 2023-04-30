import type { PaletteOptions, ThemeOptions } from "@mui/material";

const background: PaletteOptions["background"] = {
  paper: "#fff",
  default: "#fff",
};

const text: PaletteOptions["text"] = {
  primary: "#000000de",
  secondary: "#00000099",
  disabled: "#00000061",
};

const divider: PaletteOptions["divider"] = "#EEEEEE";

const primary: PaletteOptions["primary"] = {
  main: "#13A8D8",
  light: "#16BDF3",
  dark: "#1396C0",
  contrastText: "#ECECEC",
};

const secondary: PaletteOptions["secondary"] = {
  main: "#E1E1E1",
  light: "#F9F9F9",
  dark: "#B4B4B4",
  contrastText: "#fff",
};

const info: PaletteOptions["info"] = {
  main: "#0288d1",
  light: "#03a9f4",
  dark: "#01579b",
  contrastText: "#fff",
};

const warning: PaletteOptions["warning"] = {
  main: "#ed6c02",
  light: "#ff9800",
  dark: "#e65100",
  contrastText: "#fff",
};

const error: PaletteOptions["error"] = {
  main: "#d32f2f",
  light: "#ef5350",
  dark: "#c62828",
  contrastText: "#fff",
};

const success: PaletteOptions["success"] = {
  main: "#2e7d32",
  light: "#4caf50",
  dark: "#1b5e20",
  contrastText: "#fff",
};

const action: PaletteOptions["action"] = {
  active: "#0000008a",
  hover: "#0000000a",
  hoverOpacity: 0.04,
  selected: "#00000014",
  selectedOpacity: 0.08,
  disabled: "#00000042",
  disabledBackground: "#0000001f",
  disabledOpacity: 0.38,
  focus: "#0000001f",
  focusOpacity: 0.12,
  activatedOpacity: 0.12,
};

export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    background,
    primary,
    secondary,
    text,
    info,
    warning,
    error,
    success,
    divider,
    action,
  },
};
