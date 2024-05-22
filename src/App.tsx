import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import ContactView from './components/ContactView/contactView';
import RootLayout from './components/rootLayout';
import ContactViewPlaceholder from './components/ContactView/contactViewPlaceholder';
import ContactFormView from './components/ContactForm/contactFormView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ContactViewPlaceholder/>
      },
      {
        path:"/:id",
        element: <ContactView/>
      },
      {
        path: "/add",
        element: <ContactFormView/>
      }
    ],
  },
]);

function App() {

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
