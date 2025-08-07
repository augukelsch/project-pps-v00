import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Parts from "./pages/parts";
import Customers from "./pages/Customers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "parts", element: <Parts /> },
      { path: "customers", element: <Customers /> },
    ],
  },
]);