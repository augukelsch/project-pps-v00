import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Parts from "./pages/Parts";
import Customers from "./pages/Customers";
import About from "./pages/About";
import Administration from "./pages/Administration";
import Orders from "./pages/Orders";
import CreateOrders from "./pages/CreateOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "parts", element: <Parts /> },
      { path: "customers", element: <Customers /> },
      { path: "orders", element: <Orders /> },
      { path: "orders/create", element: <CreateOrders /> },
      { path: "admin", element: <Administration /> },
      { path: "about", element: <About /> },
    ],
  },
]);