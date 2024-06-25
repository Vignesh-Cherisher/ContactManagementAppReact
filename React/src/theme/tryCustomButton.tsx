import React from 'react';
import { Button, ButtonProps } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides  {
    custom: true 
  }
}

type CustomButtonProps = ButtonProps & {
  variant?: 'text' | 'outlined' | 'contained' | 'custom';
};

const CustomButton: React.FC<CustomButtonProps> = ({ variant = 'text', ...props }) => {
  return <Button variant={variant} {...props} />;
};

export default CustomButton

// import * as React from "react";
// import { createTheme, styled, useThemeProps } from "@mui/material/styles";
// import { green, purple } from "@mui/material/colors";

// export interface ButtonProps {
//   variant?: string;
// }

// declare module '@mui/material/styles' {
//   interface Palette {
//     customPrimary: Palette['primary']
//     customSeconday: Palette['secondary']
//   }

//   interface PaletteOptions {
//     customPrimary?: PaletteOptions['primary'];
//     customSeconday?: PaletteOptions['secondary']
//   }
// } 

// export const theme = createTheme({
//   palette: {
//     customPrimary: {
//       main: purple[500],
//     },
//     customSeconday: {
//       main: green[500],
//     }
//   },
// });

// const PrimaryButton = styled("button", {
//   name: "PrimaryBtn",
//   slot: "root",
// })<{ ownerState: ButtonProps }>(({ theme, ownerState }) => ({
//   fontWeight: 600,
//   ...(ownerState.variant === "violet-edition" && {
//     backgroundColor: theme.palette.primary.main,
//     border: `2px solid ${theme.palette.divider}`,
//   }),
// }));

// const StyledButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   (inProps, ref) => {
//     const props = useThemeProps({ props: inProps, name: "PrimaryBtn" });
//     const { variant, ...other } = props;

//     const ownerState = { ...props, variant };

//     return (
//       <PrimaryButton ref={ref} ownerState={ownerState} {...other}>
//       </PrimaryButton>
//     );
//   }
// );

// export default StyledButton