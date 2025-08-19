import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Parts from "./pages/Parts";
import Customers from "./pages/Customers";
import About from "./pages/About";
import Administration from "./pages/Administration";
import Orders from "./pages/Orders";
import CreateOrders from "./pages/CreateOrders";
import Login from "./pages/Login";

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
  {
    path: "/login",
    element: <Login />,
    children: [],
  }
]);


export const routerNotLogedIn = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    children: [],
  }
]);