import { createBrowserRouter } from "react-router-dom";

// Layouts
import AuthLayout from "../components/layout/auth/AuthLayout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "@/pages/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      { path: "", element: <Dashboard /> },
    ],
  },
]);

export default router;
