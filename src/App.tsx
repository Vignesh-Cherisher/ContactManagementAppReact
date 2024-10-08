import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ContactView from "./components/ContactView/contactView";
import RootLayout from "./components/rootLayout";
import ContactViewPlaceholder from "./components/ContactView/contactViewPlaceholder";
import ContactFormView from "./components/ContactForm/contactFormView";
import NotFoundPage from "./components/ErrorPage/notFoundPage";

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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
