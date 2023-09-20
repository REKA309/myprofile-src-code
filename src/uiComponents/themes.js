// themes.js
import { createTheme } from "@mui/material/styles";

export const dayModeTheme = createTheme({
  palette: {
    primary: {
      main: "#000", // Change this to your desired font color for day mode
    },
    background: {
        default: "#fff", // Background color for day mode
      },
    // Other theme settings for day mode
  },
});

export const nightModeTheme = createTheme({
  palette: {
    primary: {
      main: "#fff", // Change this to your desired font color for night mode
    },
    background: {
        default: "#000", // Background color for night mode
      },
    // Other theme settings for night mode
  },
});