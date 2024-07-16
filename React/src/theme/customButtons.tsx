import { Button, styled } from "@mui/material";

export const CustomButton = styled(Button)(({ theme }) => ({
  ...(theme.palette.mode === "dark" && {
    transition: "all 0.5s ease-out",
    backgroundColor: theme.palette.primary.light,
    border: `0.5px solid rgb(209, 213, 219)`,
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  }),
}));

export const OutlinedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: "rgb(17, 24, 39)",
  fontFamily: "Clarkson",
  fontWeight: "500",
  textTransform: "uppercase",
  transition:
    "opacity 300ms cubic-bezier(.694, 0, 0.335, 1),background-color 100ms cubic-bezier(.694, 0, 0.335, 1),color 100ms cubic-bezier(.694, 0, 0.335, 1);",
  borderRadius: "0.5rem",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  border: `0.5px solid ${theme.palette.primary.main}`,

  "&:hover": {
    backgroundColor: "#ddeeff",
  },
}));