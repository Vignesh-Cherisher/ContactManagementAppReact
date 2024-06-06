import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
// import { deepmerge } from '@mui/utils';
// import customComponentTheme from './customizedButtonTheme';

declare module "@mui/material/styles" {
  interface Palette {
    contactPanelBorderP: Palette["primary"];
    contactPanelBorderS: Palette["secondary"];
    titleText: Palette["divider"];
  }

  interface PaletteOptions {
    contactPanelBorderP?: PaletteOptions["primary"];
    contactPanelBorderS?: PaletteOptions["secondary"];
    titleText?: Palette["divider"];

  }
}

export const darkPalette = createTheme({
  palette: {
    mode: 'dark',
    contactPanelBorderP: {
      main: 'whitesmoke',
      dark: "black",
    },
    action: {
      active: "#a688fa",
      hover: "#5e43f3"
    },
    text: {
      primary: "#fff",
      secondary: "#8b8b8b"
    },
    divider:"#3f3f3f",
    primary: {
      main: "#7a5af5",
    },
    background: {
      paper: "#282828",
      default: "black"
    },
    titleText: "rgb(241,157,0)",
    error: {
      main: red.A100,
    }
  },
});

export const lightPalette = createTheme({
  palette: {
    contactPanelBorderP: {
      main: "whitesmoke",
    },
    titleText: "rgb(241,157,0)"
  }
})

