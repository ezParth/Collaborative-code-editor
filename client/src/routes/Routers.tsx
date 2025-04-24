import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Editor from "../pages/Editor/Editor";
import Dashboard from "../pages/Landing_Page/Dashboard";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/SignUp";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/editor",
                element: <Editor />,
            },
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "Login",
                element: <Login />
            },
            {
                path: "Signup",
                element: <Signup />
            }
        ]
    },
]);

export default Router;
