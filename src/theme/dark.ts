import type { PaletteOptions, ThemeOptions } from "@mui/material";

const background: PaletteOptions["background"] = {
  paper: "#121212",
  default: "#121212",
};

const text: PaletteOptions["text"] = {
  primary: "#ffffff",
  secondary: "#ffffffb3",
  disabled: "#ffffff80",
};

const divider: PaletteOptions["divider"] = "#ffffff1f";

const primary: PaletteOptions["primary"] = {
  main: "#90caf9",
  light: "#e3f2fd",
  dark: "#42a5f5",
  contrastText: "#000000de",
};

const secondary: PaletteOptions["secondary"] = {
  main: "#ce93d8",
  light: "#f3e5f5",
  dark: "#ab47bc",
  contrastText: "#000000de",
};

const info: PaletteOptions["info"] = {
  main: "#29b6f6",
  light: "#4fc3f7",
  dark: "#0288d1",
  contrastText: "#000000de",
};

const warning: PaletteOptions["warning"] = {
  main: "#ffa726",
  light: "#ffb74d",
  dark: "#f57c00",
  contrastText: "#000000de",
};

const error: PaletteOptions["error"] = {
  main: "#f44336",
  light: "#e57373",
  dark: "#d32f2f",
  contrastText: "#fff",
};

const success: PaletteOptions["success"] = {
  main: "#66bb6a",
  light: "#81c784",
  dark: "#388e3c",
  contrastText: "#000000de",
};

const action: PaletteOptions["action"] = {
  active: "#fff",
  hover: "#ffffff14",
  hoverOpacity: 0.08,
  selected: "#ffffff29",
  selectedOpacity: 0.16,
  disabled: "#ffffff4d",
  disabledBackground: "#ffffff1f",
  disabledOpacity: 0.38,
  focus: "#ffffff1f",
  focusOpacity: 0.12,
  activatedOpacity: 0.24,
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
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
