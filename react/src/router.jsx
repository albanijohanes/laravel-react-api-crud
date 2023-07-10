import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import User from "./views/User";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import Notfound from "./views/Notfound";

const router = createBrowserRouter([
    {
      path:'/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="/users" />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path:'/users',
          element: <User />
        }
      ]
    },
    {
      path:'/',
      element: <GuestLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path:'/register',
          element: <Register />
        }
      ]
    },
    {
      path:'*',
      element: <Notfound />
    }
])

export default router;
