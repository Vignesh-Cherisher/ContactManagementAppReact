import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import ContactView from './components/ContactView/contactView';
import RootLayout from './components/rootLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ContactView/>
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
