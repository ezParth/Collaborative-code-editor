import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Editor from "../pages/Editor/Editor";
import Dashboard from "../pages/Landing_Page/Dashboard";

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
            }
        ]
    },

]);

export default Router;
