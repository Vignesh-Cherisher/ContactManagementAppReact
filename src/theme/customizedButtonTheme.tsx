import { green, grey, purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "all 0.5s ease-out",
        },
      },

      variants: [
        {
          props: { variant: "contained" },
          style: {
            transition: "all 0.5s ease-out",
            backgroundColor: purple[500],
            color: "white",
            "&:hover": {
              backgroundColor: green[500],
            },
            border: `1px solid ${grey[500]} `,
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
          },
        },
        {
          props: { variant: "custom" },
          style: {
            backgroundColor: 'white',
            borderWidth: '0',
            color: 'black',
            cursor: 'pointer',
            fontFamily: 'Clarkson',
            fontWeight: '500',
            textTransform: 'uppercase',
            transition: 'opacity 300ms cubic-bezier(.694, 0, 0.335, 1),background-color 100ms cubic-bezier(.694, 0, 0.335, 1),color 100ms cubic-bezier(.694, 0, 0.335, 1);',
            
          },
        },
      ],
    },
  },
});

export default theme;
