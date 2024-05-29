import { createTheme } from "@mui/material";
import { deepmerge } from '@mui/utils';
import customComponentTheme from './customizedButtonTheme';

declare module "@mui/material/styles" {
  interface Palette {
    contactPanelBorderP: Palette["primary"];
    contactPanelBorderS: Palette["secondary"];
  }

  interface PaletteOptions {
    contactPanelBorderP?: PaletteOptions["primary"];
    contactPanelBorderS?: PaletteOptions["secondary"];
  }
}

const customPalette = deepmerge(customComponentTheme,createTheme({
  palette: {
    contactPanelBorderP: {
      main: "whitesmoke",
      dark: "black",
    },
  },
}));

export default customPalette;
