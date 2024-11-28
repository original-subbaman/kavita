import { createTheme } from "@mui/material";

const MuiTheme = createTheme({
  components: {
    MuiPopover: {
      styleOverrides: {
        root: {
          backgroundColor: "#132d23",
        },
      },
    },
  },
});

export default MuiTheme;
