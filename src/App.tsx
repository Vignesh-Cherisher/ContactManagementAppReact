import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ContactView from "./components/ContactView/contactView";
import RootLayout from "./components/rootLayout";
import ContactViewPlaceholder from "./components/ContactView/contactViewPlaceholder";
import ContactFormView from "./components/ContactForm/contactFormView";
import NotFoundPage from "./components/ErrorPage/notFoundPage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { useMemo } from "react";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import { deepmerge } from '@mui/utils';
import customPalette from './theme/darkTheme';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ContactViewPlaceholder />,
      },
      {
        path: "/:id",
        element: <ContactView />,
      },
      {
        path: "/add",
        element: <ContactFormView />,
      },
      {
        path: "/:id/edit",
        element: <ContactFormView />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path: "/notFound",
    element: <NotFoundPage />,
  },
]);

function App() {
  const mode = useSelector((state: RootState) => state.responsiveUi.isDarkMode)

  const theme = useMemo(
    () =>
      deepmerge(customPalette,createTheme({
        palette: {
          mode,
        },
      })),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
