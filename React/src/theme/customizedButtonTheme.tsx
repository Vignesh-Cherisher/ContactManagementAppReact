import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const customComponentTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "all 0.5s ease-out",
          cursor: "pointer",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: ({ theme }) => ({
            border: `0.5px solid rgb(209, 213, 219)`,
            transition: "all 0.5s ease-out",
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            ...(theme.palette.mode === "dark"
              ? {
                  backgroundColor: theme.palette.primary.dark,
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: green[700],
                  },
                }
              : {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: green[500],
                  },
                }),
          }),
        },
        {
          props: { variant: "custom" },
          style: ({ theme }) =>
            theme.unstable_sx({
              fontFamily: "Clarkson",
              fontWeight: "500",
              textTransform: "uppercase",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              border: `0.5px solid ${theme.palette.primary.main}`,
              ...(theme.palette.mode === "dark"
                ? {
                    backgroundColor: "black",
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      backgroundColor: "#353535",
                    },
                  }
                : {
                    backgroundColor: "white",
                    color: "rgb(17, 24, 39)",
                    "&:hover": {
                      backgroundColor: "#ddeeff",
                    },
                  }),
            }),
        },
      ],
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: green[500],
          "&.Mui-checked": {
            color: green[500],
          },
        },
      },
    },
  },
});

export default customComponentTheme;
