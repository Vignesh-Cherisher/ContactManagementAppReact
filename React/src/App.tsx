import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ContactView from "./components/ContactView/contactView";
import RootLayout from "./components/rootLayout";
import ContactViewPlaceholder from "./components/ContactView/contactViewPlaceholder";
import ContactFormView from "./components/ContactForm/contactFormView";
import NotFoundPage from "./components/ErrorPage/notFoundPage";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { useMemo } from "react";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import { darkPalette, lightPalette } from "./theme/darkTheme";

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
      {
        path: "/notFound",
        element: <NotFoundPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

function App() {
  const mode = useSelector((state: RootState) => state.responsiveUi.isDarkMode);

  const theme = useMemo(() => {
    if (mode === "light") {
      return lightPalette
    }
    return darkPalette;
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
